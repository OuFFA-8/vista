import { Component, ElementRef, ViewChild, signal, inject, OnInit, AfterViewInit, QueryList, ViewChildren, HostListener, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

// استيراد الواجهات والخدمات
import { PortfolioService, Service } from './../../core/services/portfolio/portfolio.service';
import { ScrollSpyService } from '../../core/services/scroll-spy/scroll-spy.service';
import { isPlatformBrowser } from '@angular/common';

// --- 1. تمت إضافة هذه الواجهة لحل المشكلة ---
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
  // حقن الخدمات
  private portfolioService = inject(PortfolioService);
  private scrollSpyService = inject(ScrollSpyService);
  private platformId = inject(PLATFORM_ID);

  // الخصائص والـ Signals
  services: Service[] = [];
  activeTab = signal<Service | null>(null);

  @ViewChild('clientsScroller') clientsScroller!: ElementRef;
  @ViewChildren('scrollSection') sections!: QueryList<ElementRef>;
  private navbarHeight = 100;

  // --- 2. تم تحديد نوع المصفوفة هنا ---
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
  
  // 1. فلترة الخدمات فقط، بدون أي عكس للترتيب
  this.services = allServices.filter(s => s.portfolio && s.portfolio.length > 0); 

  // 2. الآن، أول عنصر في المصفوفة هو "تصاميم جرافيك" وسيتم تعيينه كالتاب النشط
  if (this.services.length > 0) {
    this.activeTab.set(this.services[0]);
  }
}


  ngAfterViewInit(): void {
    if (this.sections) {
      this.onWindowScroll();
    }
  }

  // دالة لتغيير التاب النشط
  changeTab(service: Service): void {
    this.activeTab.set(service);
  }

  // دوال التحكم في سلايدر العملاء والـ Scroll Spy
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