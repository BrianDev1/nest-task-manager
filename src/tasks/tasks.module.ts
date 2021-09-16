import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksReposity } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksReposity]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
