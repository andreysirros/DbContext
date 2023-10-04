import { DynamicModule, Global, Module, Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { extractTokenFromHeader } from './utils';
import { Connection, Model, createConnection } from 'mongoose';

@Global()
@Module({})
export class DbContextCoreModule {
  static register(uri, getDbName) {
    const dbContextModuleUriProvider = {
      provide: 'DBCONTEXT_MODULE_URI',
      useValue: uri,
    };

    /* Connection Map */
    const connectionMapProvider = this.createConnectionMapProvider();

    /* DbContext Context */
    const dbContextContextProvider = this.createDbContextContextProvider(getDbName);

    const modelDefinitionMapProvider = this.createModelDefinitionMapProvider();

    const providers: Provider[] = [
      dbContextModuleUriProvider,
      dbContextContextProvider,
      connectionMapProvider,
      modelDefinitionMapProvider,
      {
        provide: 'DBCONTEXT_CONNECTION',
        useFactory: async (database, uri, connMap, modelDefMap) => {
          return await this.getConnection(database, uri, connMap, modelDefMap);
        },
        inject: ['DBCONTEXT_CONTEXT', 'DBCONTEXT_MODULE_URI', 'CONNECTION_MAP', 'MODEL_DEFINITION_MAP'],
      },
    ];

    return {
      module: DbContextCoreModule,
      providers: providers,
      exports: providers,
    };
  }

  private static async getConnection(database, uri, connMap, modelDefMap) {
    if (!database) return;
    const exists = connMap.has(database);

    // Return the connection if exist
    if (exists) {
      const connection = connMap.get(database) as Connection;
      return connection;
    }
    // console.log('uri', uri);
    const tentantURI = `${uri}/${database}`;

    const connection = createConnection(tentantURI);

    // Attach connection to the models passed in the map
    modelDefMap.forEach((definition: any) => {
      const { name, schema, collection } = definition;

      connection.model(name, schema, collection);
    });

    connMap.set(database, connection);

    return connection;
  }

  private static createConnectionMapProvider(): Provider {
    return {
      provide: 'CONNECTION_MAP',
      useFactory: (): any => new Map(),
    };
  }

  private static createModelDefinitionMapProvider(): Provider {
    return {
      provide: 'MODEL_DEFINITION_MAP',
      useFactory: () => new Map(),
    };
  }

  private static createDbContextContextProvider(getDbName): Provider {
    return {
      provide: 'DBCONTEXT_CONTEXT',
      scope: Scope.REQUEST,
      useFactory: (req: Request): string => {
        const dbName = getDbName(req);
        return dbName;
      },
      // inject: [REQUEST, JwtService],
      inject: [REQUEST],
    };
  }
}
