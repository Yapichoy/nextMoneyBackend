import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { SumCategoryDto } from '../dto/category/sum-category.dto';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { PeriodOperationDto } from '../dto/operation/period-operation.dto';

@Controller('category')
export class CategoryController {
  accountId = 1;
  constructor(private readonly categoryService: CategoryService) {}
  @Post('getAllWithSum')
  getAllWithSum(@Body() period: PeriodOperationDto): Promise<SumCategoryDto[]> {
    return this.categoryService.getAllWithSum(this.accountId, period);
  }

  @Post()
  add(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    console.log(createCategoryDto);
    return this.categoryService.add(this.accountId, createCategoryDto);
  }
}
