import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UniqueConstraint } from './decorator';
import { ValidateService } from './service/validate.service';
import { PaginatorService } from './service/paginate.service';

@Module({
  providers: [UniqueConstraint, ValidateService, PaginatorService],
  imports: [PrismaModule],
  exports: [ValidateService, PaginatorService]
})
export class SharedModule {}
