import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, Length, MinLength } from "class-validator";

export class CreateFilmDto {
    @ApiProperty({example: 'kokojambo', description: 'Назва'})
    @IsString()
    @MinLength(3, {message: 'Мінімальний назва 3 символа'})
    name: string;

    @ApiProperty({example: 'Потужний фільм, повинен подивитись кожен , в ньому пів пів пав пав', description: 'Опис'})
    @IsString()
    @MinLength(8, {message: 'Мінімальний опис 8 символів'})
    description: string;

    @ApiProperty({example: 'http://poster.jpg', description: 'Постер'})
    @IsString()
    posterUrl: string;

    @ApiProperty({example: [1,2,3], description: 'Жанри'})
    @IsArray()
    genres: number[];
}