import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { DbContextModule } from '../../../lib';
import { CatSchema } from './schemas/cat.schema';
import { CatsService } from './cats.service';

@Module({
  imports: [DbContextModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
