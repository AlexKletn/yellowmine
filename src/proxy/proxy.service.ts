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
      catchError((err) => {
        return of(err.response);
      })
    );
  }
}
