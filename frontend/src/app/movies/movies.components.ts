import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { MoviesService } from './movies.service';
import { zoomInUpAnimation } from '../animations';
import { MovieListComponent } from '../movie-list';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  animations: [zoomInUpAnimation],
})
export class MoviesComponent {
  moviesInfo = this.moviesService.moviesInfo;
  host = location.host;

  constructor(
    private readonly router: Router,
    private readonly moviesService: MoviesService
  ) {}

  navigateTo(path: string) {
    const id = path.substring(path.indexOf('anime/') + 6);
    this.router.navigate(['/title'], { queryParams: { id } });
  }
}
