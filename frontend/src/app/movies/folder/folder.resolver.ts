import { of } from 'rxjs';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MoviesService } from '../movies.service';
import { MovieInfo } from '../movies.modal';
import { FolderService } from './folder.service';

export const FolderResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.queryParams['id'];
  if (!id) {
    goToMain();
  }

  const moviesInfo = inject(MoviesService).moviesInfo;
  const folder = findFolderById(moviesInfo, id);
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

const findFolderById = (data: MovieInfo[], id: string) => {
  let resData = null;
  let traversalData = data;
  const ids = id.split('/');
  for (const id of ids) {
    const found = traversalData.find(
      (item: any) => item.name.toLowerCase() === id.toLocaleLowerCase()
    );
    if (found) {
      resData = found;
      traversalData = found.children || [];
    } else {
      return null; // Return null if any segment is not found
    }
  }
  return resData;
};
