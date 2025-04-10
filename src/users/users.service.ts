import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from 'src/roles/roles.service';
import { BanDto } from './dto/ban.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

    constructor(
        private prisma: PrismaService,
        private roleService: RolesService
    ) {} 

    async addRole(dto: AddRoleDto): Promise<User> {
        const user = await this.prisma.user.findUnique({where: {id: dto.userId}})
        const role = await this.roleService.getRoleByValue(dto.value)


        if(user && role) {
            return await this.prisma.user.update({
                where: {id: user.id},
                data: {
                    roles: {
                        connect: {id: role.id}
                           }  
                },

            })
        }

        throw new HttpException('Користувач чи роль не знайдено', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanDto): Promise<User> {
        const user = await this.prisma.user.findUnique({where: {id: dto.userId}})
        
        if(!user) {
            throw new Error('Користувача не знайдено')
        }

        return this.prisma.user.update({
            where: {id: user.id},
            data: {
                banned: true,
                banReason: dto.reason
            }
        })
    }

    async create(dto: CreateUserDto): Promise<User> {
        const user =  await this.prisma.user.create({
            data: dto
        })
        const role = await this.roleService.getRoleByValue('ADMIN')

        if(!role) {
            throw new Error('Role "User" nor found')
        }

        const updatedUser = await this.prisma.user.update({
            where: {id: user.id},
            data: {
                roles: {
                    connect: { id: role.id }
                }
            }
        })

        return updatedUser;
    }

    async getById(userId: number) {
        return await this.prisma.user.findUnique({where: {id: userId}})
    }
}
