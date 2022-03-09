import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { OperationEntity } from '../entities/operation.entity';

@Injectable()
export class OperationService {
  async getOperations(): Promise<any>{
    let categories: CategoryEntity[] = await getRepository(
      CategoryEntity,
    ).find();
    const operations: OperationEntity[] = await getRepository(OperationEntity)
      .createQueryBuilder('operations')
      .select('operations.categoryId')
      .addSelect('sum(operations.sum)', 'sum')
      .groupBy('operations.categoryId')
      .getRawMany();
    categories = categories.map((c) => {
      //@ts-ignore
      const index = operations.findIndex((o) => o.categoryId == c.id);
      if (index !== -1) {
        //@ts-ignore
        c.sum = operations[index].sum;
      }
      return c;
    });
    return categories;
  }
}
