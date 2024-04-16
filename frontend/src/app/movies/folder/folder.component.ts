import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { MovieInfo } from '../movies.modal';
import { FolderService } from './folder.service';
import { zoomInUpAnimation } from '../../animations';
import { MovieListComponent } from '../../movie-list';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [CommonModule, MovieListComponent],
  styleUrl: './folder.component.scss',
  templateUrl: './folder.component.html',
  animations: [zoomInUpAnimation],
})
export class FolderComponent implements OnInit {
  folder$ = inject(FolderService).folder$;

  foldersList: MovieInfo[] = [];
  othersList: MovieInfo[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.attachFolderChangeListener();
  }

  navigateTo({ path, type }: MovieInfo) {
    if (type === 'file') {
      return;
    }
    const id = path.substring(path.indexOf('anime/') + 6);
    this.router.navigate(['/title'], { queryParams: { id } });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private Methods
  // -----------------------------------------------------------------------------------------------------

  attachFolderChangeListener() {
    this.folder$.subscribe((folder) => {
      this.foldersList = [];
      this.othersList = [];
      folder.children?.forEach((child) => {
        child.children?.length
          ? this.foldersList.push(child)
          : this.othersList.push(child);
      });
    });
  }
}
