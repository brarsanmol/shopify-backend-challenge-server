import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  identifier: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  quantity: number
}
