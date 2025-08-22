import { Injectable, signal } from '@angular/core';
import { MediaItem } from '../portfolio/portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  isOpen = signal(false);
  
  // الآن نخزن مصفوفة الوسائط ومؤشر الصورة الحالية
  activeMediaList = signal<MediaItem[]>([]);
  currentIndex = signal(0);

  constructor() { }

  // دالة الفتح الآن تستقبل مصفوفة
  open(items: MediaItem[], startIndex: number = 0): void {
    if (items && items.length > 0) {
      this.activeMediaList.set(items);
      this.currentIndex.set(startIndex);
      this.isOpen.set(true);
    }
  }

  close(): void {
    this.isOpen.set(false);
    this.activeMediaList.set([]);
  }

  // دوال التنقل
  next(): void {
    this.currentIndex.update(i => (i + 1) % this.activeMediaList().length);
  }

  prev(): void {
    this.currentIndex.update(i => (i - 1 + this.activeMediaList().length) % this.activeMediaList().length);
  }
}