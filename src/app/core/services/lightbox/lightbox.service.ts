import { Injectable, signal } from '@angular/core';
import { MediaItem } from '../portfolio/portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {

  isOpen = signal(false);
  
  activeMedia = signal<MediaItem | null>(null);

  constructor() { }

  open(item: MediaItem): void {
    if (item.type === 'video') {
      this.activeMedia.set(item);
      this.isOpen.set(true);
    }
  }

  close(): void {
    this.isOpen.set(false);
    this.activeMedia.set(null);
  }}
