import { DynamicModule, Global, Module } from '@nestjs/common';
import { TenancyCoreModule } from './tenancyCore.module';
import { IModelDefinition } from './interfaces';
import { TenancyFeatureModule } from './tenancyFeature.module';

@Global()
@Module({})
export class TenancyModule {
  static forRoot(uri, getDbName): DynamicModule {
    console.log('uri', uri);

    return {
      module: TenancyModule,
      imports: [TenancyCoreModule.register(uri, getDbName)],
    };
  }

  static forFeature(models: IModelDefinition[]): DynamicModule {
    return {
      module: TenancyModule,
      imports: [TenancyFeatureModule.register(models)],
    };
  }
}
