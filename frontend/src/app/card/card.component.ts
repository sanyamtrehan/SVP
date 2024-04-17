import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

import { MovieInfo } from '../movies';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  host: { class: 'movie inline-container', '(click)': 'navigateTo()' },
})
export class CardComponent {
  @Input()
  set movie(val: MovieInfo) {
    this._movie = val;
    this.setBackgroundImage();
  }
  get movie() {
    return this._movie;
  }

  private _movie = {} as MovieInfo;

  @HostBinding('style.background-image')
  private backgroundImage = '';

  @HostBinding('style.background-size')
  private backgroundSize = 'cover';

  constructor(private readonly router: Router) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Private Methods
  // -----------------------------------------------------------------------------------------------------

  private setBackgroundImage() {
    let img = this.movie.icon;
    if (this.movie.type === 'file') {
      img = '/assets/video-strip.png';
      this.backgroundSize = 'contain';
    }
    this.backgroundImage = `url(${img})`;
  }

  private navigateTo() {
    const { path, type } = this.movie;
    const id = path.substring(path.indexOf('anime/') + 6);
    const routePath = type === 'file' ? '/watch' : '/title';
    this.router.navigate([routePath], { queryParams: { id } });
  }
}
