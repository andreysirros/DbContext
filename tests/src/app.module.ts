import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

console.log('Module', Module);

@Module({
  imports: [CatsModule],
})
export class AppModule {}
