import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanDto } from './dto/ban.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Видати роль'})
  @ApiResponse({status: 200})
  @Post('/role')
  addRole(@Body() dto: AddRoleDto): Promise<User> {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({summary: 'Забанити користувача'})
  @ApiResponse({status: 200})
  // @UseGuards(JwtAuthGuard)
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanDto): Promise<User> {
    return this.usersService.ban(dto)
  }

}
