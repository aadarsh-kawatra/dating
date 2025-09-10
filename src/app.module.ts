import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.modules';
import { MongoDbModule } from './modules/mongodb/mongodb.module';

@Module({
  imports: [ConfigModule.forRoot(), MongoDbModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
