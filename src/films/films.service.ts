import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from '@prisma/client';

@Injectable()
export class FilmsService {

    constructor(private prisma: PrismaService) {}

    async createFilm(dto: CreateFilmDto): Promise<Film> {
        return await this.prisma.film.create({data: {
            name: dto.name,
            description: dto.description,
            posterUrl: dto.posterUrl,
            genres: {
                connect: dto.genres.map(id => ({id}))
            }
        }})
    }

    async updateFilm(id: number, dto: UpdateFilmDto): Promise<Film> {
        return await this.prisma.film.update({
            where: {id},
            data: {
                name: dto.name,
                description: dto.description,
                posterUrl: dto.posterUrl,
                genres: {
                    connect: dto.genres.map(id => ({id}))
                }
            }
        })
    }

    async removeFilm(id: number): Promise<Film> {
        return await this.prisma.film.delete({where: {id}})
    }

    async getFilmsByDate(date: Date): Promise<Film[]> {
        const films = await this.prisma.film.findMany({
            include: {
                session: {
                    where: {
                        startTime: {
                            gte: date,
                            lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
                        }
                    }
                }
            }
        })

        return films;
    }

    async getAllFilm(): Promise<Film[]> {
        const films = await this.prisma.film.findMany()

        return films
    }
    async getFilm(id: number): Promise<Film> {
        const film = await this.prisma.film.findUnique({where: {id}})

        return film
    }
}
