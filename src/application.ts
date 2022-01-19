import { config, DotenvConfigOutput } from "dotenv"
import express, { Application as ExpressApplication, json } from "express"
import { join } from "path"
import { autoInjectable, container, singleton } from "tsyringe"
import cors from "cors"
import { Server } from "http"
import { createConnection, getRepository } from "typeorm"
import { attachControllerInstances } from "@decorators/express"
import { ItemController } from "./controllers/item.controller"
import { ItemService } from "./services/item.service"

@autoInjectable()
@singleton()
export class Application {
  private express: ExpressApplication

  constructor() {
    this.express = express()

    this.initializeAsync()
  }

  private async initializeAsync() {
    this.useEnvironmentFile()
    await this.useDatabase()
    this.useCors()
    this.useMiddleware()
    this.useServices()
    this.useControllers()
  }

  private useMiddleware(): void {
    this.express.use(json())
  }

  private useCors(): void {
    this.express.use(
      cors({
        origin: [`https://${process.env.CLIENT_ADDRESS}`]
      })
    )
  }

  private useEnvironmentFile(): void {
    const result: DotenvConfigOutput = config({
      path: join(__dirname, "../", `.env.${process.env.NODE_ENV}`)
    })

    if (result.error) throw result.error
  }

  private async useDatabase(): Promise<void> {
    await createConnection()
  }

  public useControllers(): void {
    attachControllerInstances(this.express, [container.resolve(ItemController)])
  }

  public useServices(): void {
    container.register("ItemService", { useClass: ItemService })
  }

  public getExpressApplication(): ExpressApplication {
    return this.express
  }

  public listen(): Server {
    return this.express.listen(process.env.PORT)
  }
}
