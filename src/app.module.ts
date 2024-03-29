import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProxyModule } from "./proxy/proxy.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { resolve } from "node:path";

console.log(__dirname);

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProxyModule,
    HttpModule,

    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../yellowmine-gui/dist/yellowmine-gui/browser'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
