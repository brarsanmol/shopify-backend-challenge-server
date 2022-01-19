import { IsInt, IsString, MaxLength, Min } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  identifier: number

  @Column()
  @IsString()
  @MaxLength(128)
  name: string

  @Column()
  @MaxLength(2048)
  description: string

  @Column()
  @IsInt()
  @Min(0)
  quantity: number
}
