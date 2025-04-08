import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class BanDto {
    @ApiProperty({example: 1, description: 'Айді користувача'})
    @IsNumber()
    userId: number
    
    @ApiProperty({example: 'Порушив правило 1.1', description: 'Причина бана'})
    @IsString()
    reason: string
}