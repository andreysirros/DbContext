import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { TenancyModule } from '../../../lib';
import { CatSchema } from './schemas/cat.schema';
import { CatsService } from './cats.service';

@Module({
  imports: [TenancyModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
