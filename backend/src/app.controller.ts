import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { IconPathDto } from './app.dto';
import { Request, Response } from 'express';

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

  @Get('movie-icon')
  getMovieIcon(@Query() { path }: IconPathDto) {
    return this.appService.getMovieIcon(path);
  }

  @Get('movie')
  getMovie(@Req() req: Request, @Res() res: Response) {
    return this.appService.getMovie(req, res);
  }
}
