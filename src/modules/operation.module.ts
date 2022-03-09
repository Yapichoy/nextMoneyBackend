import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationEntity } from '../entities/operation.entity';
import { OperationController } from '../controllers/operation.controller';
import { OperationService } from '../services/operation.service';

@Module({
  imports: [TypeOrmModule.forFeature([OperationEntity])],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
