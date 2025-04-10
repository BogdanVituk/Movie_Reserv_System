import { IsNumber, IsString } from "class-validator"

export class PaymentDto {
    @IsNumber()
    sessionId: number

    @IsNumber()
    amount: number
    
    @IsString()
    currency: string

    @IsString()
    name: string
}