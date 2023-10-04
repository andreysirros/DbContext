import { Provider } from '@nestjs/common';
export declare class DbContextCoreModule {
    static register(uri: any, getDbName: any): {
        module: typeof DbContextCoreModule;
        providers: Provider[];
        exports: Provider[];
    };
    private static getConnection;
    private static createConnectionMapProvider;
    private static createModelDefinitionMapProvider;
    private static createDbContextContextProvider;
}
