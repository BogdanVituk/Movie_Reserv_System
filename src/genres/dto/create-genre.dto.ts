import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenreDto {
    
    @ApiProperty({example: "Бойовик", description: 'Назва жанру'})
    @IsString()
    name: string
}