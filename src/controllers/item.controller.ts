import { Item } from "@app/entities/item.entity"
import { IItemService } from "@app/services/interfaces/item.service.interface"
import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Patch,
  Post,
  Response
} from "@decorators/express"
import { Response as ExpressResponse } from "express"
import { inject, injectable, singleton } from "tsyringe"
import { DeleteResult, UpdateResult } from "typeorm"

@singleton()
@injectable()
@Controller("/items")
export class ItemController {
  constructor(
    @inject("ItemService")
    private readonly itemService: IItemService
  ) {}

  @Get("/:identifier")
  public async getByIdentifier(
    @Params("identififer") identifier: number,
    @Response() response: ExpressResponse
  ): Promise<void> {
    const item: Item | undefined = await this.itemService.findByIdentifier(
      identifier
    )

    item ? response.status(200).send(item) : response.status(404).send()
  }

  @Post("/")
  public async create(
    @Body() item: Item,
    @Response() response: ExpressResponse
  ): Promise<void> {
    const result: Item = await this.itemService.save(item)

    item ? response.status(200).send(result) : response.status(500).send()
  }

  @Patch("/")
  public async update(
    @Params("identifier") identifier: number,
    @Body() item: Partial<Item>,
    @Response() response: ExpressResponse
  ): Promise<void> {
    const result: UpdateResult = await this.itemService.update(identifier, item)

    result.affected > 0
      ? response.status(204).send()
      : response.status(404).send()
  }

  @Delete("/")
  public async delete(
    @Params("identifier") identifier: number,
    @Response() response: ExpressResponse
  ) {
    const result: DeleteResult = await this.itemService.delete(identifier)

    result.affected > 0
      ? response.status(204).send()
      : response.status(404).send()
  }
}
