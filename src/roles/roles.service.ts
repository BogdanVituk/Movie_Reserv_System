import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { Role } from '@prisma/client';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateRolesDto): Promise<Role> {
        return await this.prisma.role.create({data: dto})
    }

    async getRoleByValue(value: string): Promise<Role> {
        return await this.prisma.role.findUnique({where: {value}})
    }
}
