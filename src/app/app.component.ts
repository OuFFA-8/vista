import { Component, OnInit, HostListener, PLATFORM_ID, Inject, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs';

// استيراد الكومبوننت
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { LightboxComponent } from "./shared/components/lightbox/lightbox.component";
import { ContactSectionComponent } from "./shared/components/contact-section/contact-section.component";
import { PreloaderComponent } from './shared/components/preloader/preloader.component';

// استيراد خدمة الـ Scroll Spy
import { ScrollSpyService } from './core/services/scroll-spy/scroll-spy.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    LightboxComponent,
    ContactSectionComponent,
    PreloaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // حقن الخدمات
  private scrollSpyService = inject(ScrollSpyService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private navbarHeight = 100;
  // متغير لتخزين ما إذا كنا في الصفحة الرئيسية
  private isHomePage: boolean = true;

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // 1. إذا كنا في صفحة داخلية، قم بتحديث الخدمة مباشرة
      if (event.urlAfterRedirects.startsWith('/about')) {
        this.scrollSpyService.activeSectionId.set('about');
      } else if (event.urlAfterRedirects.startsWith('/portfolio')) {
        this.scrollSpyService.activeSectionId.set('portfolio');
      } else {
        // إذا كنا في الصفحة الرئيسية، دع الـ Scroll Spy يتولى الأمر
        // ولكن أعد تعيينها مؤقتًا لتجنب بقاء الحالة القديمة
        if (this.scrollSpyService.activeSectionId() !== '') {
          this.scrollSpyService.activeSectionId.set('');
        }
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }

  @HostListener('window:scroll', [])
  onAppScroll(): void {
    // لا تقم بتشغيل هذا المنطق إلا إذا كنا في الصفحة الرئيسية
    if (!this.isHomePage) {
      return;
    }

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