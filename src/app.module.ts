import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { CategoryModule } from './modules/category.module';
import { AccountModule } from './modules/account.module';
import { OperationModule } from './modules/operation.module';
import { UserEntity } from './entities/user.entity';
import { CategoryEntity } from './entities/category.entity';
import { AccountEntity } from './entities/account.entity';
import { OperationEntity } from './entities/operation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: '3141592',
      database: 'nextmoney',
      entities: [UserEntity, CategoryEntity, AccountEntity, OperationEntity],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    AccountModule,
    OperationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
