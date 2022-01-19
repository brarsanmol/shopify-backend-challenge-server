import { Middleware } from "@decorators/express"
import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { Request, Response, NextFunction } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BodyValidator(entity: any): any {
  class BodyValidatorMiddleware implements Middleware {
    async use(
      request: Request<
        ParamsDictionary,
        unknown,
        unknown,
        ParsedQs,
        Record<string, unknown>
      >,
      response: Response<unknown, Record<string, unknown>>,
      next: NextFunction
    ): Promise<void> {
      await validate(plainToClass(entity, request.body)).catch(errors =>
        response.status(422).send(errors)
      )

      return next()
    }
  }
  return new BodyValidatorMiddleware()
}
