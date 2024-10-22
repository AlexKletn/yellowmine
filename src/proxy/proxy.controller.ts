import { All, Controller, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { Request, Response } from 'express';

@Controller(['redmine'])
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {
  }

  @All('*')
  async proxy(@Req() req: Request, @Res() response: Response) {
    const headerEntries = Object.entries(req.headers);

    const headers = Object.fromEntries(headerEntries.filter(([key]) => !['host', 'x-redmine-base'].includes(key as string)));
    const url = req.url.replace(/^\/(redmine)/, '');

    const proxyRequest = this.proxyService.proxy(req.method, url, {
      headers,
      params: req.query,
      data: req.body,
    });

    proxyRequest.catch((err) => {
      console.log(err);
    });
    const res = await proxyRequest;

    const headersEntries = Object.entries(res.headers ?? {});

    headersEntries.forEach(([key, value]) => {
      if ([
        'transfer-encoding',
      ].includes(key.toLowerCase())) {
        return;
      }
      response.append(key, value as string);
    });

    // console.log(res.data.toString());

    response.status(res.status).send(res.data);
  }
}
