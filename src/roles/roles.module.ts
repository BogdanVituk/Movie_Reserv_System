import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleController } from './roles.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RoleController],
  providers: [RolesService, PrismaService],
  exports: [RolesService]
})
export class RoleModule {}
