import { Component, HostListener, inject, signal, computed, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ScrollSpyService } from '../../core/services/scroll-spy/scroll-spy.service'; // 1. تأكد من استيراد الخدمة

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // --- حقن الخدمات ---
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private scrollSpyService = inject(ScrollSpyService); // 2. حقن الخدمة

  // --- 3. إعادة تعريف المتغير المفقود ---
  // هذا يجعل الـ signal من الخدمة متاحًا للقالب
  activeSectionId = this.scrollSpyService.activeSectionId;

  // --- Signals ---
  private readonly isScrolled = signal(false);
  private readonly hasHeroSection = signal(this.checkIfPageHasHero(this.router.url));

  // --- Computed Signal ---
  readonly showBackground = computed(() => !this.hasHeroSection() || this.isScrolled());

  @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef<HTMLButtonElement>;

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.hasHeroSection.set(this.checkIfPageHasHero(event.urlAfterRedirects));
    });
  }

  private checkIfPageHasHero(url: string): boolean {
    const heroPages = ['/home', '/about'];
    return heroPages.some(page => url.startsWith(page));
  }

  @HostListener('window:scroll')
  private handleScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrolled = window.scrollY > 50;
      if (this.isScrolled() !== scrolled) {
        this.isScrolled.set(scrolled);
      }
    }
  }

  closeMobileMenuOnClick(): void {
    if (isPlatformBrowser(this.platformId) && this.mobileMenuButton?.nativeElement) {
      const isMenuExpanded = this.mobileMenuButton.nativeElement.getAttribute('aria-expanded') === 'true';
      if (isMenuExpanded) {
        this.mobileMenuButton.nativeElement.click();
      }
    }
  }
}