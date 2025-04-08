import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import  * as bcrypt from 'bcryptjs'
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(dto: CreateUserDto) {
        const user: User = await this.validateUser(dto)
        return this.generateToken(user)
    }

    async register(dto: CreateUserDto) {
        
        const { email, password } = dto;

        const candidate = await this.prisma.user.findUnique({where: {email}});

        if(candidate) { 
            throw new HttpException('User exist', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await this.usersService.create({...dto, password: hashPassword})

        return this.generateToken(user)
    }

    async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, name: user.name}

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const { email } = userDto
        const user = await this.prisma.user.findUnique({where: {email}})
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)

        if(user && passwordEquals) {
            return user
        }

        throw new UnauthorizedException({message: 'Incorrect password or email'})
    }
}
