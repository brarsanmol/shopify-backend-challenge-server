import { Item } from "@app/entities/item.entity"
import { DeleteResult, UpdateResult } from "typeorm"

export interface IItemService {
  findByIdentifier(identifier: number): Promise<Item | undefined>

  update(identifier: number, item: Partial<Item>): Promise<UpdateResult>

  save(item: Item): Promise<Item>

  delete(identifier: number): Promise<DeleteResult>

  toCSV(identifiers?: Array<number>): Promise<string>
}
