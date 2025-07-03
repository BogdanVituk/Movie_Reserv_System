import { Controller, Post, Body, UseGuards, Get, Param, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Session } from '@prisma/client';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @ApiOperation({summary: 'Створити  сесію'})
  @ApiResponse({status: 200})
  // @Roles("ADMIN")
  // @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateSessionDto): Promise<Session>  {
    return this.sessionsService.createSessionWithSeats(dto);
  }

  // @Get()
  // getBook() {
  //   return this.sessionsService.checkSessionAndSendEmails()
  // }

  @Get('/byNameOrDate')
  getSessionByFilmNameOrDate(
    @Query('filmName') filmName:string,
    @Query('date') date: string
  ) {
    return this.sessionsService.getSessionbyNameOrDate(filmName, date);
  }

  @Get(':id')
  getSessionByFilmId(@Param('id') id: string) {
    return this.sessionsService.getSessionbyFilmdId(+id);
  }

}
