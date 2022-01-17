import "reflect-metadata"
import { container } from "tsyringe"
import { Application } from "@app/application"

function bootstrap() {
  const application: Application = container.resolve(Application)
  application.listen()
}

bootstrap()
