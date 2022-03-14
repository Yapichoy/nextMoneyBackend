import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { OperationEntity } from '../entities/operation.entity';
import { SumOperationDto } from '../dto/operation/sum-operation.dto';
import { SumCategoryDto } from '../dto/category/sum-category.dto';
import { AccountEntity } from '../entities/account.entity';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { PeriodOperationDto } from '../dto/operation/period-operation.dto';

@Injectable()
export class CategoryService {
  async getAllWithSum(
    accountId: number,
    period: PeriodOperationDto,
  ): Promise<any> {
    const account = await getRepository(AccountEntity).findOne({
      where: { id: accountId },
    });
    let categories: SumCategoryDto[] = await getRepository(CategoryEntity).find(
      { where: { account: account } },
    );
    console.log(period)
    const operations: SumOperationDto[] = await getRepository(OperationEntity)
      .createQueryBuilder('operations')
      .select('operations.categoryId')
      .addSelect('sum(operations.sum)', 'sum')
      .where('operations.accountId = :accountId', { accountId })
      .andWhere('operations.operationDate >= :start', {
        start: new Date(period.start),
      })
      .andWhere('operations.operationDate <= :finish', {
        finish: new Date(period.finish),
      })
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

  async add(accountId: number, createCategoryDto: CreateCategoryDto) {
    const account = await getRepository(AccountEntity).findOne({
      where: { id: accountId },
    });
    const category = new CategoryEntity();
    category.categoryName = createCategoryDto.categoryName;
    category.account = account;
    category.logo = createCategoryDto.logo;
    category.color = createCategoryDto.color;
    return await getRepository(CategoryEntity).save(category);
  }
}
