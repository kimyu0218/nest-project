import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello, nest!' };
  }

  @Get('/dynamic')
  dynamicRender(@Res() res: Response) {
    return res.render(this.appService.getViewName(), {
      message: 'Dynamic Rendering',
    });
  }
}
