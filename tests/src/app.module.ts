import { Module, PreconditionFailedException } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DbContextModule } from '../../lib';
import { JwtModule } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

const getDbNameFromRequest = (req: Request) => {
  const [_, token] = req.headers['authorization']?.split(' ') ?? [];

  let decode;
  try {
    decode = jwt.verify(token, 'SECRET_EXAMPLE');
  } catch (error) {
    throw new PreconditionFailedException();
  }

  console.log('[createTenantContextProvider] - decode:', decode);

  const database = decode?.data.code;
  req['database'] = database;

  return database;
};

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'andreysmattos',
      signOptions: { expiresIn: '60s' },
    }),
    CatsModule,
    DbContextModule.forRoot('mongodb://127.0.0.1', getDbNameFromRequest),
  ],
})
export class AppModule {}
