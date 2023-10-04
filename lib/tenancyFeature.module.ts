import { DynamicModule, Global, Module } from '@nestjs/common';
import { IModelDefinition } from './interfaces';
import { createTenancyProviders } from './factories';
// import { createTenancyProviders } from './factories';
// import { ModelDefinition } from './interfaces';

@Global()
@Module({})
export class TenancyFeatureModule {
  static register(models: IModelDefinition[]): DynamicModule {
    const providers = createTenancyProviders(models);
    return {
      module: TenancyFeatureModule,
      providers,
      exports: providers,
    };
  }
}
