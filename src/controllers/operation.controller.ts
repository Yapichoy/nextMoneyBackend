import { Controller, Get } from '@nestjs/common';
import { OperationService } from '../services/operation.service';
import { OperationEntity } from "../entities/operation.entity";
import { CategoryEntity } from "../entities/category.entity";

@Controller('operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}
  @Get()
  getOperations(): any {
    return this.operationService.getOperations();
  }
}
