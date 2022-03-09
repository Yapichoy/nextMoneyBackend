import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OperationEntity } from './operation.entity';
import { CategoryEntity } from "./category.entity";

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  bill: number;
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
  @OneToMany(() => CategoryEntity, (category) => category.account)
  categories: CategoryEntity[];
  @OneToMany(() => OperationEntity, (operation) => operation.account)
  operations: OperationEntity[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
