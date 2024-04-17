import { Request, Response } from 'express';
import { Controller, Get, Query, Req, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { MovieTitleDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('movies-info')
  getMovieInfo() {
    return this.appService.getMoviesInfo();
  }

  @Get('movie')
  getMovie(
    @Query() { path }: MovieTitleDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.appService.getMovie(path, req, res);
  }
}
