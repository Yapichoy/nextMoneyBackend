import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { AccountEntity } from './account.entity';

@Entity('operations')
export class OperationEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sum: number;
  @ManyToOne(() => CategoryEntity, (category) => category.operations)
  category: CategoryEntity;
  @ManyToOne(() => AccountEntity, (account) => account.operations)
  account: AccountEntity;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
