import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"


export class AddRoleDto {
    @ApiProperty({example: 1, description: 'Айді користувача'})
    @IsNumber()
    userId: number

    @ApiProperty({example: 'ADMIN', description: 'Значення ролі'})
    @IsString()
    value: string
}