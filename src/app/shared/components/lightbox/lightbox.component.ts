import { Component, inject, computed } from '@angular/core';
import { LightboxService } from '../../../core/services/lightbox/lightbox.service';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.css'
})
export class LightboxComponent {
  lightboxService = inject(LightboxService);

  currentItem = computed(() => {
    const list = this.lightboxService.activeMediaList();
    const index = this.lightboxService.currentIndex();
    if (list.length > 0) {
      return list[index];
    }
    return null;
  });

  closeLightbox(): void { this.lightboxService.close(); }
  nextItem(): void { this.lightboxService.next(); }
  prevItem(): void { this.lightboxService.prev(); }
}