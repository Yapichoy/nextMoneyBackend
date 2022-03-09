import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OperationEntity } from "./operation.entity";
import { AccountEntity } from "./account.entity";

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  categoryName: string;
  @Column()
  color: string;
  @Column()
  logo: string;
  @OneToMany(() => OperationEntity, (operation) => operation.category)
  operations: OperationEntity[];
  @ManyToOne(() => AccountEntity, (account) => account.categories)
  account: AccountEntity;
}
