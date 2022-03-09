import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { OperationEntity } from '../entities/operation.entity';
import { CreateOperationDto } from '../dto/operation/create-operation.dto';
import { AccountEntity } from "../entities/account.entity";
import { CategoryEntity } from "../entities/category.entity";

@Injectable()
export class OperationService {
  async create({ sum, accountId, categoryId }: CreateOperationDto): Promise<any> {
    const account = await getRepository(AccountEntity)
      .findOne({where:{id: accountId}});
    console.log('account', account);
    const category = await getRepository(CategoryEntity)
      .findOne({where: {id: categoryId}});
    console.log('category', category);
    const operation = new OperationEntity();
    operation.account = account;
    operation.category = category;
    operation.sum = sum;
    await getRepository(OperationEntity).save(operation);
    console.log('Saved');
  }
}
