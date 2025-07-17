import { Component, ElementRef, ViewChild, signal, computed, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

// --- Interfaces ---
interface Project {
  images: string[];
  details: { partner: string; client: string; type: string; };
}
interface Service {
  title: string;
  linkText: string;
  portfolio?: Project[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      if (this.currentProject() && isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.animatePortfolioIn();
        }, 0);
      }
    });
  }

  @ViewChild('clientsScroller') clientsScroller!: ElementRef;
  
  selectedService = signal<Service | null>(null);
  currentProjectIndex = signal(0);
  isAnimating = signal(false);
  // 1. تمت إضافة هذا الـ signal لتخزين اتجاه الحركة
  lastAnimationDirection = signal<'next' | 'prev' | 'none'>('none');

  currentProject = computed(() => {
    const service = this.selectedService();
    if (!service?.portfolio?.length) return null;
    return service.portfolio[this.currentProjectIndex()];
  });
  
  hasMultipleProjects = computed(() => {
    const portfolio = this.selectedService()?.portfolio;
    return portfolio ? portfolio.length > 1 : false;
  });

  services: Service[] = [
    {
      title: 'تصاميم جرافيك', linkText: 'اضغط للمعاينة',
      portfolio: [
        { images: [ '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' ], details: { partner: 'شركة مراكيز', client: 'تربس', type: 'إعلانات سوشيال ميديا' } },
        { images: [ '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png', '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' ], details: { partner: 'شركة ألفا', client: 'نمو', type: 'تصميم هوية بصرية' } }
      ]
    },
    { title: 'ويب سايت', linkText: 'اضغط للمعاينة' },
    { title: 'إنتاج اعلامي', linkText: 'اضغط للمعاينة' },
    { title: 'براندق', linkText: 'اضغط للمعاينة' }
  ];

  clients = [
    { src: '/images/عملائنا/1.png', alt: 'Al Majdouie Logo' },
    { src: '/images/عملائنا/2.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/3.png', alt: 'Al Majdouie Logo' },
    { src: '/images/عملائنا/4.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/5.png', alt: 'Al Majdouie Logo' },
    { src: '/images/عملائنا/6.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/7.png', alt: 'Al Majdouie Logo' },
    { src: '/images/عملائنا/8.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/9.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/10.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/11.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/12.png', alt: 'Osool Logo' },
    { src: '/images/عملائنا/1.png', alt: 'Al Majdouie Logo' },
    { src: '/images/عملائنا/2.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/3.png', alt: 'Al Majdouie Logo' },
    { src: '/images/عملائنا/4.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/5.png', alt: 'Al Majdouie Logo' },
    { src: '/images/عملائنا/6.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/7.png', alt: 'Al Majdouie Logo' },
    { src: '/images/عملائنا/8.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/9.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/10.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/11.png', alt: 'Kabi Logo' },
    { src: '/images/عملائنا/12.png', alt: 'Osool Logo' },
  ];

  toggleService(service: Service): void {
    // 2. عند فتح بورتفوليو جديد، نضبط الاتجاه إلى "none" (ظهور عادي)
    this.lastAnimationDirection.set('none');
    if (this.selectedService() === service) {
      this.selectedService.set(null);
    } else if (service.portfolio?.length) {
      this.selectedService.set(service);
      this.currentProjectIndex.set(0);
    }
  }

  // 3. تم تعديل دوال السلايدر لتحديد الاتجاه
  nextProject(): void {
    if (this.isAnimating()) return;
    const portfolio = this.selectedService()?.portfolio;
    if (!portfolio) return;
    this.lastAnimationDirection.set('next'); // نحدد أن الحركة "للتالي"
    this.animatePortfolioOut('left').then(() => {
      this.currentProjectIndex.update(index => (index + 1) % portfolio.length);
    });
  }

  prevProject(): void {
    if (this.isAnimating()) return;
    const portfolio = this.selectedService()?.portfolio;
    if (!portfolio) return;
    this.lastAnimationDirection.set('prev'); // نحدد أن الحركة "للسابق"
    this.animatePortfolioOut('right').then(() => {
      this.currentProjectIndex.update(index => (index - 1 + portfolio.length) % portfolio.length);
    });
  }

  scrollRight(): void { this.clientsScroller.nativeElement.scrollBy({ left: 300, behavior: 'smooth' }); }
  scrollLeft(): void { this.clientsScroller.nativeElement.scrollBy({ left: -300, behavior: 'smooth' }); }
  
  // 4. دالة الدخول الآن تعتمد على الـ signal الجديد
  private animatePortfolioIn(): void {
    const container = document.querySelector('.portfolio-container');
    if (!container) return;
    
    const direction = this.lastAnimationDirection();
    let startX = 0;
    // إذا كانت الحركة "للتالي"، ابدأ من اليمين
    if (direction === 'next') startX = 100;
    // إذا كانت الحركة "للسابق"، ابدأ من اليسار
    else if (direction === 'prev') startX = -100;
    
    gsap.fromTo(container, 
      { xPercent: startX, autoAlpha: 0 },
      { 
        duration: 0.7, 
        xPercent: 0, 
        autoAlpha: 1, 
        ease: 'power2.out',
        onComplete: () => this.isAnimating.set(false)
      }
    );
  }

  // دالة الخروج تبقى كما هي
  private animatePortfolioOut(direction: 'left' | 'right'): Promise<void> {
    return new Promise(resolve => {
      const container = document.querySelector('.portfolio-container');
      if (!container) {
        resolve(); return;
      }
      this.isAnimating.set(true);
      const xPercent = direction === 'left' ? -100 : 100;
      
      gsap.to(container, {
        duration: 0.5,
        xPercent: xPercent,
        autoAlpha: 0,
        ease: 'power2.in',
        onComplete: () => resolve()
      });
    });
  }
}