import { Component, ElementRef, ViewChild, signal, computed, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

interface Project {
  media: MediaItem[];
  details: { partner: string; client: string; type: string; };
}

interface Service {
  title: string;
  linkText: string;
  portfolio?: Project[];
}

interface MediaItem {
  type: 'image' | 'video';
  src: string;
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
      title: 'تصاميم جرافيك',
      linkText: 'اضغط للمعاينة',
      portfolio: [
        {
          // 1. تم تحويل "images" إلى "media" مع تحديد النوع "image"
          media: [
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' }
          ],
          details: { partner: 'شركة مراكيز', client: 'تربس', type: 'إعلانات سوشيال ميديا' }
        },
        {
          media: [
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' }
          ],
          details: { partner: 'شركة ألفا', client: 'نمو', type: 'تصميم هوية بصرية' }
        }
      ]
    },
    {
      title: 'ويب سايت',
      linkText: 'اضغط للمعاينة',
      portfolio: [
        {
          // 2. تم تحويل "images" إلى "media" مع تحديد النوع "image"
          media: [
            { type: 'image', src: 'https://i.imgur.com/uCjL9fQ.png' }
          ],
          details: { partner: 'اسم العميل', client: 'اسم المشروع', type: 'تطوير موقع إلكتروني' }
        },
        {
          media: [
            { type: 'image', src: 'https://i.imgur.com/uCjL9fQ.png' }
          ],
          details: { partner: 'اسم العميل 2', client: 'اسم المشروع 2', type: 'تطوير موقع إلكتروني' }
        }
      ]
    },
    {
      title: 'إنتاج اعلامي',
      linkText: 'اضغط للمعاينة',
      portfolio: [
        {
          media: [
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-1164-large.mp4' },
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-the-spheres-of-a-trinitarian-clock-42872-large.mp4' },
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-pale-hornet-moth-in-a-close-up-shot-48842-large.mp4' },
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-marketing-and-business-plan-34139-large.mp4' }
          ],
          details: { partner: 'استديو فيستا', client: 'خاص', type: 'فيديوهات ترويجية' }
        },
        {
          media: [
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-1164-large.mp4' },
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-the-spheres-of-a-trinitarian-clock-42872-large.mp4' },
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-pale-hornet-moth-in-a-close-up-shot-48842-large.mp4' },
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-marketing-and-business-plan-34139-large.mp4' }
          ],
          details: { partner: 'استديو فيستا', client: 'خاص', type: 'فيديوهات ترويجية' }
        },
      ]
    },
    {
      title: 'براندق',
      linkText: 'اضغط للمعاينة'
    }
  ];

  clients = [
    { src: '/images/عملائنا/1.png', alt: '' },
    { src: '/images/عملائنا/2.png', alt: '' },
    { src: '/images/عملائنا/3.png', alt: '' },
    { src: '/images/عملائنا/4.png', alt: '' },
    { src: '/images/عملائنا/5.png', alt: '' },
    { src: '/images/عملائنا/6.png', alt: '' },
    { src: '/images/عملائنا/7.png', alt: '' },
    { src: '/images/عملائنا/8.png', alt: '' },
    { src: '/images/عملائنا/9.png', alt: '' },
    { src: '/images/عملائنا/10.png', alt: '' },
    { src: '/images/عملائنا/11.png', alt: '' },
    { src: '/images/عملائنا/12.png', alt: '' },
    { src: '/images/عملائنا/1.png', alt: '' },
    { src: '/images/عملائنا/2.png', alt: '' },
    { src: '/images/عملائنا/3.png', alt: '' },
    { src: '/images/عملائنا/4.png', alt: '' },
    { src: '/images/عملائنا/5.png', alt: '' },
    { src: '/images/عملائنا/6.png', alt: '' },
    { src: '/images/عملائنا/7.png', alt: '' },
    { src: '/images/عملائنا/8.png', alt: '' },
    { src: '/images/عملائنا/9.png', alt: '' },
    { src: '/images/عملائنا/10.png', alt: '' },
    { src: '/images/عملائنا/11.png', alt: '' },
    { src: '/images/عملائنا/12.png', alt: '' },
  ];

  toggleService(service: Service): void {
    this.lastAnimationDirection.set('none');
    if (this.selectedService() === service) {
      this.selectedService.set(null);
    } else if (service.portfolio?.length) {
      this.selectedService.set(service);
      this.currentProjectIndex.set(0);
    }
  }

  nextProject(): void {
    if (this.isAnimating()) return;
    const portfolio = this.selectedService()?.portfolio;
    if (!portfolio) return;
    this.lastAnimationDirection.set('next');
    this.animatePortfolioOut('left').then(() => {
      this.currentProjectIndex.update(index => (index + 1) % portfolio.length);
    });
  }

  prevProject(): void {
    if (this.isAnimating()) return;
    const portfolio = this.selectedService()?.portfolio;
    if (!portfolio) return;
    this.lastAnimationDirection.set('prev'); 
    this.animatePortfolioOut('right').then(() => {
      this.currentProjectIndex.update(index => (index - 1 + portfolio.length) % portfolio.length);
    });
  }

  scrollRight(): void { this.clientsScroller.nativeElement.scrollBy({ left: 300, behavior: 'smooth' }); }
  scrollLeft(): void { this.clientsScroller.nativeElement.scrollBy({ left: -300, behavior: 'smooth' }); }

  private animatePortfolioIn(): void {
    const container = document.querySelector('.portfolio-container');
    if (!container) return;

    const direction = this.lastAnimationDirection();
    let startX = 0;
    if (direction === 'next') startX = 100;
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