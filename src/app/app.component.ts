import { Component, OnInit, HostListener, PLATFORM_ID, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { LightboxComponent } from "./shared/components/lightbox/lightbox.component";
import { ContactSectionComponent } from "./shared/components/contact-section/contact-section.component";
import { ScrollSpyService } from './core/services/scroll-spy/scroll-spy.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    LightboxComponent,
    ContactSectionComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }

  private scrollSpyService = inject(ScrollSpyService);
  private platformId = inject(PLATFORM_ID);
  private navbarHeight = 100;

  constructor() { }

  @HostListener('window:scroll', [])
  onAppScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const threshold = window.innerHeight * 0.66;
        if (contactSection.getBoundingClientRect().top < threshold) {
          if (this.scrollSpyService.activeSectionId() !== 'contact') {
            this.scrollSpyService.activeSectionId.set('contact');
          }
        }
      }
    }
  }
}