import { DynamicModule } from '@nestjs/common';
import { IModelDefinition } from './interfaces';
export declare class TenancyModule {
    static forRoot(uri: any, getDbName: any): DynamicModule;
    static forFeature(models: IModelDefinition[]): DynamicModule;
}
