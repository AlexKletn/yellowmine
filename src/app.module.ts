import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyModule } from './proxy/proxy.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'node:path';
import { RedmineConfigController } from './config/redmine-config.controller';
import { RedmineConfigModule } from './config/redmine-config.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProxyModule,
    HttpModule,

    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../yellowmine-gui/dist/yellowmine-gui/browser'),
    }),

    RedmineConfigModule,
  ],
  controllers: [AppController, RedmineConfigController],
  providers: [AppService],
})
export class AppModule {}
