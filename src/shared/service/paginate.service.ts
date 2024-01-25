import { Injectable } from "@nestjs/common";
import { PaginateOptions } from "../interface";

@Injectable()
export class PaginatorService {
  constructor() {}

  async paginator(model: any, args: any, options: PaginateOptions) {
    const page = Number(options?.page) || 1;
    const perPage = Number(options?.perPage) || 10;

    console.log(args.where);

    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ]);

    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  }
}
