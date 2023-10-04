import { Provider } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
export declare const createTenancyProviders: (definitions: ModelDefinition[]) => Provider[];
