import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { RoleModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [RoleModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService]
})
export class UsersModule {}
