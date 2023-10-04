import { Provider } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
export declare const createDbContextProviders: (definitions: ModelDefinition[]) => Provider[];
