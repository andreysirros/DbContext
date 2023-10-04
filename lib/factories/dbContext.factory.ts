import { Provider } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
import { getDbContextModelDefinitionToken, getDbContextModelToken } from '../utils';
import { Connection } from 'mongoose';

export const createDbContextProviders = (definitions: ModelDefinition[]): Provider[] => {
  const providers: Provider[] = [];

  for (const definition of definitions) {
    // Extract the definition data
    const { name, schema, collection } = definition;

    providers.push({
      provide: getDbContextModelDefinitionToken(name),
      useFactory: (modelDefinitionMap, connectionMap) => {
        const exists = modelDefinitionMap.has(name);
        if (!exists) {
          modelDefinitionMap.set(name, { ...definition });

          // connectionMap.forEach((connection: Connection) => {
          //   connection.model(name, schema, collection);
          // });
        }
      },
      inject: ['MODEL_DEFINITION_MAP', 'CONNECTION_MAP'],
    });

    // Creating Models with connections attached
    providers.push({
      provide: getDbContextModelToken(name),
      useFactory(dbContextConnection: Connection) {
        if (!dbContextConnection) return;
        return dbContextConnection.models[name] || dbContextConnection.model(name, schema, collection);
      },
      inject: ['DBCONTEXT_CONNECTION'],
    });
  }

  return providers;
};
