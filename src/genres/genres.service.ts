import { Injectable } from '@nestjs/common';
import { Genre } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {

    constructor(private prisma: PrismaService) {}
    async create(dto: CreateGenreDto): Promise<Genre> {
        return this.prisma.genre.create({data: dto })
    }
}
