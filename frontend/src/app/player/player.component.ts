import {
  OnInit,
  inject,
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import * as qs from 'qs';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Subscription, debounceTime, fromEvent, timer } from 'rxjs';

import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  styleUrl: './player.component.scss',
  templateUrl: './player.component.html',
})
export class PlayerComponent implements OnInit {
  file$ = inject(PlayerService).file$;
  videoUrl = '';
  isPlaying = true;
  isFullscreen = false;
  playbackSpeedIndex = 2;
  playbackOptions = [0.5, 0.75, 1, 1.25, 1.5];
  leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  private controlsVisibilitySubscription?: Subscription;

  @ViewChild('VideoElRef')
  videoElRef!: ElementRef<HTMLVideoElement>;

  @ViewChild('ProgressRef')
  progressRef!: ElementRef<HTMLDivElement>;

  @ViewChild('ControlsRef')
  controlsRef!: ElementRef<HTMLDivElement>;

  get videoEl() {
    if (!this.videoElRef) {
      return {} as HTMLVideoElement;
    }
    return this.videoElRef.nativeElement;
  }

  get progressEl() {
    return this.progressRef.nativeElement;
  }

  get controlsEl() {
    return this.controlsRef?.nativeElement;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Life Cycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit() {
    this.attachFileListener();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Methods
  // -----------------------------------------------------------------------------------------------------

  togglePlaying() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.videoEl.play();
    } else {
      this.videoEl.pause();
    }
  }

  skipBy(seconds: number) {
    this.videoEl.currentTime += seconds;
    this.updateProgressBar();
  }

  updateProgressBar() {
    const percent = this.videoEl.currentTime / this.videoEl.duration;
    this.setProgressPercentage(percent);
  }

  toggleFullScreen() {
    this.isFullscreen = !this.isFullscreen;
    if (this.isFullscreen) {
      const appPlayer = document.querySelector('app-player') as HTMLElement;
      appPlayer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  togglePlaybackSpeed(index: number) {
    this.playbackSpeedIndex = index;
    this.videoEl.playbackRate = this.playbackOptions[index];
  }

  getRemainingTime() {
    const timeLeft = this.videoEl.duration - this.videoEl.currentTime;
    if (isNaN(timeLeft)) {
      return 0;
    }
    const seconds = Math.floor(timeLeft % 60);
    const minutes = Math.floor(timeLeft / 60) % 60;
    const hours = Math.floor(timeLeft / 3600);
    if (hours === 0) {
      return `${minutes}:${this.leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${this.leadingZeroFormatter.format(
        minutes
      )}:${this.leadingZeroFormatter.format(seconds)}`;
    }
  }

  handleTimelineProgress(e: MouseEvent) {
    const rect = this.progressEl.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    this.setProgressPercentage(percent);
    this.videoEl.currentTime = percent * this.videoEl.duration;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private Methods
  // -----------------------------------------------------------------------------------------------------

  private attachFileListener() {
    this.file$.subscribe(({ path }) => {
      const qParams = qs.stringify({ path });
      this.videoUrl = `http://${location.host}/api-v1/movie?${qParams}`;
      setTimeout(this.attachMouseMoveEvent);
      setTimeout(this.attachKeyboardEvents);
      this.toggleControls();
    });
  }

  private attachMouseMoveEvent = () => {
    fromEvent(this.videoEl, 'mousemove').subscribe(this.toggleControls);
  };

  private toggleControls = () => {
    this.controlsVisibilitySubscription?.unsubscribe();
    this.showControls();
    this.controlsVisibilitySubscription = timer(1500).subscribe(
      this.hideControls
    );
  };

  private showControls = () => {
    if (!this.videoEl.classList?.contains('svp-player--show')) {
      this.videoEl.classList?.add('svp-player--show');
    }
    if (!this.controlsEl?.classList?.contains('controls--show')) {
      this.controlsEl?.classList?.add('controls--show');
    }
  };

  private hideControls = () => {
    this.videoEl.classList?.remove('svp-player--show');
    this.controlsEl.classList?.remove('controls--show');
  };

  private setProgressPercentage = (percent: number | string) => {
    percent = percent.toString();
    this.progressEl.style.setProperty('--progress-position', percent);
  };

  private attachKeyboardEvents = () => {
    console.log('ded');
    fromEvent(document, 'keydown')
      .pipe(debounceTime(70))
      .subscribe((e) => {
        const key = (e as KeyboardEvent).key;
        this.toggleControls();
        switch (key) {
          case ' ':
            return this.togglePlaying();
          case 'ArrowLeft':
            return this.skipBy(-10);
          case 'ArrowRight':
            return this.skipBy(10);
        }
      });
  };
}
