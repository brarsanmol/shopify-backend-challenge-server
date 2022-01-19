import { Item } from "@app/entities/item.entity"
import { singleton } from "tsyringe"
import { DeleteResult, getRepository, Repository, UpdateResult } from "typeorm"
import { IItemService } from "./interfaces/item.service.interface"

@singleton()
export class ItemService implements IItemService {
  private readonly itemRepository: Repository<Item>

  constructor() {
    this.itemRepository = getRepository(Item)
  }

  public async findByIdentifier(identifier: number): Promise<Item | undefined> {
    return await this.itemRepository.findOne(identifier)
  }

  public async update(
    identifier: number,
    item: Partial<Item>
  ): Promise<UpdateResult> {
    return await this.itemRepository.update(identifier, item)
  }

  public async save(item: Item): Promise<Item> {
    return await this.itemRepository.save(item)
  }

  public async delete(identifier: number): Promise<DeleteResult> {
    return await this.itemRepository.delete(identifier)
  }
}
