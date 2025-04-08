import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateRolesDto {

    @ApiProperty({
        description: "Значення ролі н-д: адмін, звичанйи користувач",
        example: "ADMIN"
    })
    @IsString({message: 'Повино бути строкою'})
    value: string
    
    @ApiProperty({
        description: "Опис які має можливості дана роль",
        example: "Звичаний користувач"
    })
    @IsString({message: 'Повино бути строкою'})
    description: string
}