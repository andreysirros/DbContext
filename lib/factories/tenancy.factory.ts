import { Provider } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
import { getTenantModelDefinitionToken, getTenantModelToken } from '../utils';
import { Connection } from 'mongoose';

export const createTenancyProviders = (definitions: ModelDefinition[]): Provider[] => {
  const providers: Provider[] = [];

  for (const definition of definitions) {
    // Extract the definition data
    const { name, schema, collection } = definition;

    providers.push({
      provide: getTenantModelDefinitionToken(name),
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
      provide: getTenantModelToken(name),
      useFactory(tenantConnection: Connection) {
        if (!tenantConnection) return;
        return tenantConnection.models[name] || tenantConnection.model(name, schema, collection);
      },
      inject: ['TENANT_CONNECTION'],
    });
  }

  return providers;
};
