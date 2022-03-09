import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OperationEntity } from "./operation.entity";

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
}
