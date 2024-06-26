import { of } from 'rxjs';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';

import { FolderService } from '../folder';
import { findMovieInfoById } from '../utils';
import { MoviesService, MovieInfo } from '../movies';

export const FolderResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.queryParams['id'];
  if (!id) {
    goToMain();
  }

  const moviesInfo = inject(MoviesService).moviesInfo;
  const folder = findMovieInfoById(moviesInfo, id);
  if (!folder) {
    goToMain();
    return of(false);
  }

  inject(FolderService).folder$.next(folder);
  return of(true);
};

const goToMain = () => {
  inject(Router).navigate(['']);
};
