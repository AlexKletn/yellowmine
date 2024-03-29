import { Injectable } from "@nestjs/common";
import { HttpModuleOptions, HttpService } from "@nestjs/axios";
import * as process from "process";
import { catchError, of } from "rxjs";

@Injectable()
export class ProxyService {
  constructor(private readonly http: HttpService) {
  }

  proxy(method: string, url: string, options: Omit<HttpModuleOptions, 'url' | 'method'> = {}) {
    return this.http.request({
      baseURL: process.env.REDMINE_URL,

      method,
      url,

      ...options,
    }).pipe(
      catchError((err, res) => {
        console.log('err', err);
        return of(err.response);
      })
    );
  }

  proxyAdmin(method: string, url: string, { headers, ...options }: Omit<HttpModuleOptions, 'url' | 'method'> = {}) {
    return this.proxy(method, url, {
      headers: {
        ...headers ?? {},

        'x-redmine-api-key': process.env.REDMINE_ADMIN_API_KEY,
      },

      ...options,
    })
  }
}
