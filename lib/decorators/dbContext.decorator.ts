import { Inject } from '@nestjs/common';
import { getDbContextConnectionToken, getDbContextModelToken } from '../utils';

/**
 * Get the instance of the dbContext model object
 *
 * @param model any
 */
export const InjectDbContextModel = (model: string) => Inject(getDbContextModelToken(model));

/**
 * Get the instance of the dbContext connection
 *
 * @param name any
 */
export const InjectDbContextConnection = (name?: string) => Inject(getDbContextConnectionToken(name));
