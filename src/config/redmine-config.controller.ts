import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('config')
export class RedmineConfigController {
  @Get('/url')
  getRedmineUrl(@Res() res: Response) {
    res.send({
      url: process.env.REDMINE_URL,
    });
  }
}
