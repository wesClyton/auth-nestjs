import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UniqueConstraint } from './decorator';
import { ValidateService } from './service/validate.service';

@Module({
  providers: [UniqueConstraint, ValidateService],
  imports: [PrismaModule],
  exports: [ValidateService]
})
export class SharedModule {}
