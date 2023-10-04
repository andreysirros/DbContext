import { DynamicModule } from '@nestjs/common';
import { IModelDefinition } from './interfaces';
export declare class DbContextFeatureModule {
    static register(models: IModelDefinition[]): DynamicModule;
}
