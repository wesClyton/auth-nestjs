import { PrismaService } from "../../prisma/prisma.service";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: "Unique", async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [model, property, id] = args.constraints;

    console.log("id: ", id);

    // if (!value || !model) return false;

    // //@ts-ignore
    // const userSelf = await this.prisma[model].findUnique({
    //   where: {
    //     [property]: value,
    //   }
    // });

    // //@ts-ignore
    // const record = await this.prisma[model].findMany({
    //   where: {
    //     [property]: value,
    //     [exceptField]: userSelf.exceptField,
    //     // ...(exceptField ? { [exceptField]: { equals: !this.prisma.user.fields[exceptField] }} : {})
    //   },
    // });

    // console.log('record', record);

    // if (userSelf === null) return true;
    // if (record.length > 1) return false;

    // // if (!exceptField) return false;

    // console.log('record.length:', record.length);

    // // const exceptFieldValue = (args.object as any)[exceptField];
    // // if (!exceptFieldValue) return false;

    return true;
    // return record[exceptField] === exceptFieldValue;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} entered is not valid`;
  }
}

export function Unique(
  obj: {
    model: string;
    uniqueField: string;
  },
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [obj.model, obj.uniqueField],
      validator: UniqueConstraint,
    });
  };
}
