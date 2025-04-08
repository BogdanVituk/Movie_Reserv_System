import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@Controller('role')
export class RoleController {
  constructor(private readonly rolesService: RolesService) {}


  @Post()
  @ApiResponse({
    status: 201,
    description: "Роль успішно створена",
    type: CreateRolesDto
  })
  create(@Body() dto: CreateRolesDto): Promise<Role> {
    return this.rolesService.create(dto)
  }

  @Get('/:value')
  @ApiResponse({
    status: 201,
    description: "Роль",
  })
  getRole(@Param('value') value: string): Promise<Role> {
    return this.rolesService.getRoleByValue(value)
  }
}
