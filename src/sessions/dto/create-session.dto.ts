import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber } from "class-validator";

export class CreateSessionDto {
    @ApiProperty({example: '2025-04-02T19:00:00.000Z', description: 'Час початку сесії'})
    @IsDate()
    startTime: Date;
    @ApiProperty({example: '2025-04-02T21:00:00.000Z', description: 'Час закінчення  сесії'})
    @IsDate()
    endTime:   Date;

    @ApiProperty({example: 50, description: 'Загальна кількість місць'})
    @IsNumber()
    totalPlaces: number;

    @ApiProperty({example: 1 , description: 'Айді фільма який буде показуватись'})
    @IsNumber()
    filmId: number
}