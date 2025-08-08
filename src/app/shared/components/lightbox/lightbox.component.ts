import { Component, inject } from '@angular/core';
import { LightboxService } from '../../../core/services/lightbox/lightbox.service';

@Component({
  selector: 'app-lightbox',
  imports: [],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.css'
})
export class LightboxComponent {

  lightboxService = inject(LightboxService);

  closeLightbox(): void {
    this.lightboxService.close();
  }

}
