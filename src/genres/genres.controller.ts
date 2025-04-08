import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from '@prisma/client';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
      status: 201,
      description: "Жанр створено",
      type: CreateGenreDto
    })
  createGenre(@Body() dto: CreateGenreDto): Promise<Genre> {
    return this.genresService.create(dto)
  }
}
