import { Module } from '@nestjs/common';
import { HttpProxyModule } from 'nest-http-proxy';
import 'dotenv/config';

console.log(process.env.REDMINE_URL);
@Module({
  imports: [
    HttpProxyModule.forRoot({
      '/redmine': {
        target: process.env.REDMINE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^redmine': '',
        },
      },
    }),
  ],
})
export class ProxyModule {}
