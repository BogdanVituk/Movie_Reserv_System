import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto)
  }

  
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto)
  }
}
