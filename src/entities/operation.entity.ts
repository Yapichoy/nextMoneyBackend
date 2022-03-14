import {
  Column,
  CreateDateColumn,
  Entity, IsNull,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { CategoryEntity } from './category.entity';
import { AccountEntity } from './account.entity';

@Entity('operations')
export class OperationEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sum: number;
  @ManyToOne(() => CategoryEntity, (category) => category.operations, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;
  @ManyToOne(() => AccountEntity, (account) => account.operations)
  account: AccountEntity;
  @Column({
    nullable: true,
  })
  operationDate: Date;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
