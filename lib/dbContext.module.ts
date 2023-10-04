import { DynamicModule, Global, Module } from '@nestjs/common';
import { DbContextCoreModule } from './dbContextCore.module';
import { IModelDefinition } from './interfaces';
import { DbContextFeatureModule } from './dbContextFeature.module';

@Global()
@Module({})
export class DbContextModule {
  static forRoot(uri, getDbName): DynamicModule {
    console.log('uri', uri);

    return {
      module: DbContextModule,
      imports: [DbContextCoreModule.register(uri, getDbName)],
    };
  }

  static forFeature(models: IModelDefinition[]): DynamicModule {
    return {
      module: DbContextModule,
      imports: [DbContextFeatureModule.register(models)],
    };
  }
}
