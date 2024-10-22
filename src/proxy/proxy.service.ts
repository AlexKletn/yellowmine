import { Injectable } from '@nestjs/common';
import { HttpModuleOptions, HttpService } from '@nestjs/axios';
import * as process from 'process';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(private readonly http: HttpService) {
  }

  async proxy(method: string, url: string, options: Omit<HttpModuleOptions, 'url' | 'method'> = {}) {
    // console.log(mime.lookup(url), options);

    return await firstValueFrom(this.http.request({
      baseURL: process.env.REDMINE_URL,

      method,
      url,

      responseType: 'arraybuffer',

      ...options,
    }));
  }
}
