import { Provider } from '@nestjs/common';
export declare class TenancyCoreModule {
    static register(uri: any, getDbName: any): {
        module: typeof TenancyCoreModule;
        providers: Provider[];
        exports: Provider[];
    };
    private static getConnection;
    private static createConnectionMapProvider;
    private static createModelDefinitionMapProvider;
    private static createTenantContextProvider;
}
