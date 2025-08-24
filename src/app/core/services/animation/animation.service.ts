import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  preloaderFinished = signal(false);

  constructor() { }
}