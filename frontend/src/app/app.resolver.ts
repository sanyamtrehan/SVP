import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { MoviesService } from './movies';

export const AppResolver: ResolveFn<any> = () => {
  return inject(MoviesService).getMoviesInfo();
};
