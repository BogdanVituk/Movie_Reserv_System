import { Controller, Body, Post, Req, Res , HttpCode, Headers } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout-session')
  async createChekoutSession(
    @Body() dto: PaymentDto
  ): Promise<{url: string}> {
    const url = await this.paymentService.createChechoutSession(dto);

    return { url }
  }

}
