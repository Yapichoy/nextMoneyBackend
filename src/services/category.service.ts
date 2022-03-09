import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { OperationEntity } from '../entities/operation.entity';
import { SumOperationDto } from '../dto/operation/sum-operation.dto';
import { SumCategoryDto } from '../dto/category/sum-category.dto';
import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class CategoryService {
  async getAllWithSum(accountId: number): Promise<any> {
    const account = await getRepository(AccountEntity).findOne({
      where: { id: accountId },
    });
    let categories: SumCategoryDto[] = await getRepository(CategoryEntity).find(
      { where: { account: account } },
    );
    const operations: SumOperationDto[] = await getRepository(OperationEntity)
      .createQueryBuilder('operations')
      .select('operations.categoryId')
      .addSelect('sum(operations.sum)', 'sum')
      .where('operations.accountId = :accountId', { accountId })
      .groupBy('operations.categoryId')
      .getRawMany();
    categories = categories.map((c) => {
      const index = operations.findIndex((o) => o.categoryId == c.id);
      if (index !== -1) {
        c.sum = operations[index].sum;
      }
      return c;
    });
    return categories;
  }
}
