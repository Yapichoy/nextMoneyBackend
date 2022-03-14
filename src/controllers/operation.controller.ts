import { Body, Controller, Post } from '@nestjs/common';
import { OperationService } from '../services/operation.service';
import { CreateOperationDto } from '../dto/operation/create-operation.dto';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post('add')
  add(@Body() operation: CreateOperationDto): any {
    operation.accountId = 1;
    this.operationService.create(operation);
  }
}
