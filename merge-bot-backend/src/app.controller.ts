import { Controller, Get, Post, Req, Headers, Body, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/webhook')
  @HttpCode(200)
  async webhook(@Req() req: Request & { rawBody?: Buffer }, @Headers() headers: Record<string, any>, @Body() _body: any) {
    const raw = req.rawBody ?? null;
    const result = await this.appService.handleWebhook(raw, headers);
    return result;
  }
}
