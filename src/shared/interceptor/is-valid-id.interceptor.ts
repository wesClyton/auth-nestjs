import { Injectable, NestInterceptor, ExecutionContext, NotFoundException, CallHandler } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Observable } from "rxjs";

@Injectable()
export class IsValidIdInterceptor implements NestInterceptor {
  public prisma = new PrismaClient();

  constructor(private readonly entityType: string) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;

    const entity = await this.prisma[this.entityType].findUnique({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(`No ${this.entityType} found with id ${id}`);
    }

    return next.handle();
  }
}
