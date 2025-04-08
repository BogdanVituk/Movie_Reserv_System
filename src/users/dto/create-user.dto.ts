import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"


export class CreateUserDto {
    
    @ApiProperty({example: 'kokojambo@gmail.com', description: 'Пошта'})
    @IsEmail({}, {message: 'Невірний формат пошти'})
    email: string

    @ApiProperty({example: 'Gosha', description: "Ім'я"})
    @IsString()
    @Length(3,14, {message: 'Не меньше 3 і не більше 14 символів'})
    name: string

    @ApiProperty({example: '1234а', description: 'Пароль'})
    @IsString()
    @Length(4,32,{message: "Не меньше 4 символів і не більше 32"})
    password: string
}