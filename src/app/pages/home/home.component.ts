import { LightboxService } from './../../core/services/lightbox/lightbox.service';
import { Component, ElementRef, ViewChild, signal, inject, OnInit, AfterViewInit, QueryList, ViewChildren, HostListener, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MediaItem, PortfolioService, Project, Service } from './../../core/services/portfolio/portfolio.service';
import { ScrollSpyService } from '../../core/services/scroll-spy/scroll-spy.service';
import { isPlatformBrowser } from '@angular/common';

interface Client {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  private portfolioService = inject(PortfolioService);
  private scrollSpyService = inject(ScrollSpyService);
  private platformId = inject(PLATFORM_ID);
  private lightboxService = inject(LightboxService);

  services: Service[] = [];
  activeTab = signal<Service | null>(null);
  activeServiceCard = signal<Service | null>(null);


  @ViewChild('clientsScroller') clientsScroller!: ElementRef;
  @ViewChildren('scrollSection') sections!: QueryList<ElementRef>;
  private navbarHeight = 100;

  clients: Client[] = [
    { src: '/images/عملائنا/1.png', alt: 'Client Logo 1' }, { src: '/images/عملائنا/2.png', alt: 'Client Logo 2' },
    { src: '/images/عملائنا/3.png', alt: 'Client Logo 3' }, { src: '/images/عملائنا/4.png', alt: 'Client Logo 4' },
    { src: '/images/عملائنا/5.png', alt: 'Client Logo 5' }, { src: '/images/عملائنا/6.png', alt: 'Client Logo 6' },
    { src: '/images/عملائنا/7.png', alt: 'Client Logo 7' }, { src: '/images/عملائنا/8.png', alt: 'Client Logo 8' },
    { src: '/images/عملائنا/9.png', alt: 'Client Logo 9' }, { src: '/images/عملائنا/10.png', alt: 'Client Logo 10' },
    { src: '/images/عملائنا/11.png', alt: 'Client Logo 11' }, { src: '/images/عملائنا/12.png', alt: 'Client Logo 12' },
  ];

  constructor() { }

  ngOnInit(): void {
    const allServices = this.portfolioService.getServices();
    let servicesWithPortfolio = allServices.filter(s => s.portfolio && s.portfolio.length > 0);

    const graphicDesignService = servicesWithPortfolio.find(s => s.title === 'تصاميم جرافيك');

    if (graphicDesignService) {
      const otherServices = servicesWithPortfolio.filter(s => s.title !== 'تصاميم جرافيك');

      this.services = [graphicDesignService, ...otherServices];

      this.activeTab.set(graphicDesignService);
      this.activeServiceCard.set(graphicDesignService);
    } else {
      this.services = servicesWithPortfolio;
      if (this.services.length > 0) {
        this.activeTab.set(this.services[0]);
        this.activeServiceCard.set(this.services[0]);
      }
    }
  }


  ngAfterViewInit(): void {
    if (this.sections) {
      this.onWindowScroll();
    }
  }

  selectServiceAndScroll(service: Service): void {
    this.activeServiceCard.set(service);
    this.activeTab.set(service);
    if (isPlatformBrowser(this.platformId)) {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  changeTab(service: Service): void {
    this.activeTab.set(service);
    this.activeServiceCard.set(null);
  }

  openVideoInLightbox(item: MediaItem): void {
    this.lightboxService.open([item]);
  }

  openGalleryInLightbox(project: Project): void {
    this.lightboxService.open(project.media);
  }

  scrollRight(): void { this.clientsScroller.nativeElement.scrollBy({ left: 300, behavior: 'smooth' }); }
  scrollLeft(): void { this.clientsScroller.nativeElement.scrollBy({ left: -300, behavior: 'smooth' }); }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.sections || !isPlatformBrowser(this.platformId)) return;
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      if (contactSection.getBoundingClientRect().top < window.innerHeight * 0.75) {
        return;
      }
    }
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
    const currentActive = this.scrollSpyService.activeSectionId();
    if (currentActive === 'contact' && currentSectionId === '') {
      return;
    }
    if (currentActive !== currentSectionId) {
      this.scrollSpyService.activeSectionId.set(currentSectionId);
    }
  }
}