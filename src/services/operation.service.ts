import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { OperationEntity } from '../entities/operation.entity';
import { CreateOperationDto } from '../dto/operation/create-operation.dto';
import { AccountEntity } from '../entities/account.entity';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class OperationService {
  async create(operationDto: CreateOperationDto): Promise<any> {
    const account = await getRepository(AccountEntity).findOne({
      where: { id: operationDto.accountId },
    });
    const category = await getRepository(CategoryEntity).findOne({
      where: { id: operationDto.categoryId },
    });
    const operation = new OperationEntity();
    operation.account = account;
    operation.category = category;
    operation.sum = operationDto.sum;
    operation.operationDate = operationDto.operationDate;
    await getRepository(OperationEntity).save(operation);
  }
}
