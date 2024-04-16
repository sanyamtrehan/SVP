import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { MovieInfo } from '../movies';

@Injectable({ providedIn: 'root' })
export class FolderService {
  folder$ = new BehaviorSubject({} as MovieInfo);
}
