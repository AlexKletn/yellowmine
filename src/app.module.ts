import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProxyModule } from "./proxy/proxy.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [ConfigModule.forRoot(), ProxyModule, HttpModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
