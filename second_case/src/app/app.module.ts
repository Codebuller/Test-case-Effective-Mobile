import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [UserModule,ConfigModule.forRoot() ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
