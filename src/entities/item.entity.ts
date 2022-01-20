import { IsInt, IsString, MaxLength, Min, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  identifier: number

  @Column()
  @IsString({ message: "The Item Name Must Be A String" })
  @MinLength(1, {
    message: "The Item Name Must Be Greater Than 1 Character"
  })
  @MaxLength(128, {
    message: "The Item Name Must Be Less Than 128 Characters"
  })
  name: string

  @Column()
  @IsString({ message: "The Item Description Must Be A String" })
  @MinLength(1, {
    message: "The Item Description Must Be Greater Than 1 Character"
  })
  @MaxLength(2048, {
    message: "The Item Description Must Be Less Than 2048 Characters"
  })
  description: string

  @Column()
  @IsInt({
    message: "The Item Quantity Must Be An Integer"
  })
  @Min(0, { message: "The Item Quantity Cannot Be Negative" })
  quantity: number
}
