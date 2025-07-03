import { Controller, Post, Body, Put, Param, Delete, UseGuards, Get } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from '@prisma/client';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('films')
// @UseGuards(JwtAuthGuard)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateFilmDto): Promise<Film> {
    return this.filmsService.createFilm(dto)
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateFilmDto): Promise<Film> {
    return this.filmsService.updateFilm(id, dto)
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<Film> {
    return this.filmsService.removeFilm(id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  getByDate(@Body() date: Date ): Promise<Film[]> {
    return this.filmsService.getFilmsByDate(date);
  }

  @Get()
  getAll() {
    return this.filmsService.getAllFilm();
  }

  @Get(':id')
  getFilm(@Param('id') id: string): Promise<Film> {
    return this.filmsService.getFilm(+id);
  }
}
