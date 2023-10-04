import { DynamicModule, Global, Module } from '@nestjs/common';
import { IModelDefinition } from './interfaces';
import { createDbContextProviders } from './factories';
// import { createDbContextProviders } from './factories';
// import { ModelDefinition } from './interfaces';

@Global()
@Module({})
export class DbContextFeatureModule {
  static register(models: IModelDefinition[]): DynamicModule {
    const providers = createDbContextProviders(models);
    return {
      module: DbContextFeatureModule,
      providers,
      exports: providers,
    };
  }
}
