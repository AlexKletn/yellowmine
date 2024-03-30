import { All, Controller, Get, Req, Res } from "@nestjs/common";
import { ProxyService } from "./proxy.service";
import { Request, Response } from "express";

@Controller(['proxy', 'api'])
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {
  }

  @Get('/redmine-url')
  getRedmineUrl(@Req() req: Request, @Res() res: Response) {
    res.send({
      url: process.env.REDMINE_URL
    });
  }

  @All('*')
  proxy(@Req() req: Request, @Res() response: Response) {
    const headerEntries = Object.entries(req.headers);

    const headers = Object.fromEntries(headerEntries.filter(([key]) => !['host', 'x-redmine-base'].includes(key as string)));
    const url = req.url.replace(/^\/(proxy|api)/, '');

    const httpRequest = this.proxyService.proxy(req.method, url, {
      headers,
      params: req.query,
      data: req.body
    });
    httpRequest
      .subscribe((res) => {
        const headersEntries = Object.entries(res.headers ?? {});

        headersEntries.forEach(([key, value]) => {
          if(!['content-length', 'x-redmine-base'].includes(key.toLowerCase())) {return}
          response.setHeader(key, value as string);
        })

        response.status(res.status).send(res.data);
      })
  }
}
