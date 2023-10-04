import { DynamicModule } from '@nestjs/common';
import { IModelDefinition } from './interfaces';
export declare class TenancyFeatureModule {
    static register(models: IModelDefinition[]): DynamicModule;
}
