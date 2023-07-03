import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('demo')
export class DemoController {
  @Get('hello')
  public async getHello(@Req() request: Request, @Res() response: Response) {
    response.send(`Hello world!`);
  }
}
