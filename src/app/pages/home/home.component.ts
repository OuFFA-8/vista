import { Component, ElementRef, ViewChild, signal, computed, effect, PLATFORM_ID, Inject, inject, OnInit, AfterViewInit, QueryList, ViewChildren, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

// استيراد الواجهات والخدمات من مكانها المركزي
import { PortfolioService, Service, Project, MediaItem } from './../../core/services/portfolio/portfolio.service';
import { RouterLink } from '@angular/router';
import { ScrollSpyService } from '../../core/services/scroll-spy/scroll-spy.service';
import { LightboxService } from '../../core/services/lightbox/lightbox.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  private lightboxService = inject(LightboxService);
  private scrollSpyService = inject(ScrollSpyService);
  private portfolioService = inject(PortfolioService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Effect لمراقبة التغييرات وتشغيل الأنيميشن
    effect(() => {
      if (this.currentProject() && isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.animatePortfolioIn();
        }, 0);
      }
    });
  }

  ngOnInit(): void {
    this.services = this.portfolioService.getServices();
  }

  ngAfterViewInit(): void {
    if (this.sections) {
      console.log('Found sections:', this.sections.length);

      this.onWindowScroll();

    }
  }

  @ViewChild('clientsScroller') clientsScroller!: ElementRef;
  @ViewChildren('scrollSection') sections!: QueryList<ElementRef>;

  services: Service[] = [];
  selectedService = signal<Service | null>(null);
  currentProjectIndex = signal(0);
  isAnimating = signal(false);
  lastAnimationDirection = signal<'next' | 'prev' | 'none'>('none');
  private navbarHeight = 100; // عدّل هذا الرقم ليناسب ارتفاع النافبار بالبكسل

  currentProject = computed(() => {
    const service = this.selectedService();
    if (!service?.portfolio?.length) return null;
    return service.portfolio[this.currentProjectIndex()];
  });

  hasMultipleProjects = computed(() => {
    const portfolio = this.selectedService()?.portfolio;
    if (portfolio && portfolio.length > 0 && portfolio[0].layout === 'grid') {
      return false;
    }
    return portfolio ? portfolio.length > 1 : false;
  });

  clients = [
    { src: '/images/عملائنا/1.png', alt: '' }, { src: '/images/عملائنا/2.png', alt: '' },
    { src: '/images/عملائنا/3.png', alt: '' }, { src: '/images/عملائنا/4.png', alt: '' },
    { src: '/images/عملائنا/5.png', alt: '' }, { src: '/images/عملائنا/6.png', alt: '' },
    { src: '/images/عملائنا/7.png', alt: '' }, { src: '/images/عملائنا/8.png', alt: '' },
    { src: '/images/عملائنا/9.png', alt: '' }, { src: '/images/عملائنا/10.png', alt: '' },
    { src: '/images/عملائنا/11.png', alt: '' }, { src: '/images/عملائنا/12.png', alt: '' },
    { src: '/images/عملائنا/13.png', alt: '' }, { src: '/images/عملائنا/14.png', alt: '' },
    { src: '/images/عملائنا/15.png', alt: '' }, { src: '/images/عملائنا/16.png', alt: '' },
    { src: '/images/عملائنا/17.png', alt: '' }, { src: '/images/عملائنا/18.png', alt: '' },
    { src: '/images/عملائنا/19.png', alt: '' },
  ];

  openInLightbox(item: MediaItem): void {
    this.lightboxService.open(item);
  }


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

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.sections || !isPlatformBrowser(this.platformId)) return;

    let currentSectionId = '';
    const scrollPosition = window.scrollY + this.navbarHeight;

    this.sections.toArray().reverse().forEach(sectionRef => {
      const section = sectionRef.nativeElement as HTMLElement;
      if (scrollPosition >= section.offsetTop) {
        if (!currentSectionId) {
          currentSectionId = section.id;
        }
      }
    });
    console.log('Current Active Section ID:', currentSectionId);


    if (this.scrollSpyService.activeSectionId() !== currentSectionId) {
      this.scrollSpyService.activeSectionId.set(currentSectionId);
    }
  }

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