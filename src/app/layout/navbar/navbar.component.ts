import { Component, HostListener, inject, signal, computed, DestroyRef, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class NavbarComponent implements AfterViewInit {

  @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef<HTMLDivElement>;

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  // Signals لحالة الشريط
  private readonly isScrolled = signal(false);
  private readonly isHomePage = signal(this.checkIsHomePage(this.router.url));

  // Computed signal: سيقوم بإظهار الخلفية إذا لم نكن في الصفحة الرئيسية، أو إذا قمنا بالتمرير لأسفل
  readonly showBackground = computed(() => !this.isHomePage() || this.isScrolled());

  constructor() {
    // مراقبة تغييرات المسار لتحديث حالة isHomePage
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => this.checkIsHomePage(event.urlAfterRedirects)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(isHome => {
      this.isHomePage.set(isHome);
      // إعادة تعيين حالة التمرير عند الانتقال إلى الصفحة الرئيسية
      if (isHome) {
        this.handleScroll(); 
      }
    });
  }

  ngAfterViewInit(): void {
    // الكود الخاص بك هنا للتحقق من وجود العناصر، وهو ممتاز
  }

  // 1. تم تصحيح منطق الدالة
  private checkIsHomePage(url: string): boolean {
    // فقط الصفحة الرئيسية (/) أو (/home) هي التي يبدأ فيها الشريط شفافًا
    return url === '/' || url === '/home';
  }
  
  // 2. تم دمج onScroll و handleScroll
  @HostListener('window:scroll')
  private handleScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      // يمكنك تغيير القيمة 50 لتحديد متى تظهر الخلفية
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