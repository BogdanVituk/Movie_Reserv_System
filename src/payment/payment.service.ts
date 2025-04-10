import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentDto } from './dto/payment.dto';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import { BookingsService } from 'src/bookings/bookings.service';

@Injectable()
export class PaymentService {
    private stripe: Stripe; 

    constructor(
        private coinfigService: ConfigService,
        private usersService: UsersService,
        private emailService: EmailService,
        private bookingsService: BookingsService    
    ) {
        this.stripe = new Stripe(this.coinfigService.get<string>("STRIPE_SECRET_KEY"), {
            apiVersion: '2025-03-31.basil'
        })

    }
 

    async createChechoutSession(dto: PaymentDto): Promise<string> {
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: dto.currency,
                        product_data: {
                            name: dto.name,
                        },
                        unit_amount: dto.amount * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `https://frontend-url/success?session_id=${dto.sessionId}`,
            cancel_url: "https://frontend-url/cancel"
        })
    return session.url
    }

    async handlePaymentSuccess(session: Stripe.Checkout.Session): Promise<void> {
       
        const sessionId = session.metadata?.sessionId;

        if (!sessionId) {
            console.warn('Немає sessionId у metadata');
            return;
          }

        console.log('Payment successful for session:', sessionId);
        
        if(session.payment_status === 'paid') {
            const userId = session.customer_email;
            const bookingId = session.metadata.bookingId;

            await this.bookingsService.updatePaymentStatus(+bookingId,'PAID')

            await this.sendConfirmEmail(userId, sessionId)
        } else {
            console.log(`Payment failed for session ${sessionId}`)
        }

    }

    async sendConfirmEmail(userId: string, sessionId: string): Promise<void> {
        const user = await this.usersService.getById(+userId);

        if(user) {
            await this.emailService.sendEmail(user.email, "Payment Success", `Your payment for session ${sessionId} was successful!`)
        } else {
            console.log(`User not found for: ${userId}`)
        }
    }

    
}
