import { Component, Input } from '@angular/core';

import { CardComponent } from '../card';
import { CommonModule } from '@angular/common';
import { MovieInfo } from '../movies/movies.modal';
import { zoomInUpAnimation } from '../animations';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './movie-list.component.html',
  host: { class: 'movies' },
  animations: [zoomInUpAnimation],
})
export class MovieListComponent {
  @Input()
  moviesInfo: MovieInfo[] = [];
}
