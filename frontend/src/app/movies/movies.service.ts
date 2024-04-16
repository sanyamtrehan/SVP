import * as qs from 'qs';
import { of, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieInfo } from '../movies';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  moviesInfo: MovieInfo[] = [];

  constructor(private readonly http: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public Methods
  // -----------------------------------------------------------------------------------------------------

  getMoviesInfo = () => {
    return this.http
      .get<MovieInfo[]>(`api-v1/movies-info`)
      .pipe(tap((moviesInfo) => (this.moviesInfo = moviesInfo)));
  };
}
