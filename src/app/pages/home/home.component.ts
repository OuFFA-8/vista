import { LightboxService } from './../../core/services/lightbox/lightbox.service';
import { Component, ElementRef, ViewChild, signal, inject, OnInit, AfterViewInit, QueryList, ViewChildren, HostListener, PLATFORM_ID, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MediaItem, PortfolioService, Project, Service } from './../../core/services/portfolio/portfolio.service';
import { ScrollSpyService } from '../../core/services/scroll-spy/scroll-spy.service';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../core/services/animation/animation.service';

gsap.registerPlugin(ScrollTrigger);

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
  private animationService = inject(AnimationService);

  services: Service[] = [];
  activeTab = signal<Service | null>(null);
  activeServiceCard = signal<Service | null>(null);
  activeVideoItem = signal<Project | null>(null);


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

  constructor() {
    effect(() => {
      if (this.animationService.preloaderFinished()) {
        this.initHeroAnimation();
      }
    });
  }
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
    this.initScrollAnimations();
  }

  private initScrollAnimations(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.to(".service-card", {
        // الخصائص النهائية التي سيصل إليها العنصر
        opacity: 1,
        y: 0,

        duration: 0.4, // مدة الأنيميشن
        ease: 'circ', // نوع الحركة

        // الأهم: stagger يجعل العناصر تظهر بالترتيب
        stagger: 0.2, // فارق زمني 0.2 ثانية بين كل بطاقة

        // ScrollTrigger هو الذي يربط الأنيميشن بالتمرير
        scrollTrigger: {
          trigger: "#services", // العنصر الذي سيفعّل الأنيميشن
          start: "top 100%",   // ابدأ الأنيميشن عندما يصل أعلى القسم إلى 80% من أسفل الشاشة
          end: "bottom 20%",
          toggleActions: "play none none none" // شغل الأنيميشن مرة واحدة فقط
        }
      });
      gsap.set(["#portfolio h2", ".tab-btn", ".portfolio-grid a", ".portfolio-grid button"], {
        opacity: 0,
        y: 40
      });

      // إنشاء timeline للتحكم في تسلسل الأنيميشن
      const portfolioTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#portfolio", // العنصر الذي سيفعّل الأنيميشن
          start: "top 70%",      // ابدأ عندما يصل الجزء العلوي من القسم إلى 70% من أسفل الشاشة
          toggleActions: "play none none none"
        }
      });

      // بدء الأنيميشن
      portfolioTl.to("#portfolio h2", { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .to(".tab-btn", {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          stagger: 0.15 // لتظهر الأزرار واحدًا تلو الآخر
        }, "-=0.5") // ابدأ هذا مع السابق
        .to(".portfolio-grid a, .portfolio-grid button", { // يستهدف الصور والأزرار
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          stagger: 0.08 // لتظهر الصور واحدة تلو الأخرى
        }, "-=0.4"); // ابدأ هذا مع السابق


      // =============================================
      // ===== START: 3. الأنيميشن الجديد لقسم العملاء =====
      // =============================================
      const clientsTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#clients",
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });
      clientsTl.from("#clients h2", { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out' })
        .from(".clients-slider-container", { // سنحتاج لإضافة هذا الكلاس في HTML
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'power2.out'
        }, "-=0.5");

      // =============================================
      // ===== START: 4. الأنيميشن الجديد لقسم التواصل =====
      // =============================================
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });
      contactTl.from(".contact-text-content", { // سنحتاج لإضافة هذا الكلاس
        opacity: 0,
        x: 50, // يأتي من اليمين
        duration: 0.8,
        ease: 'power2.out'
      })
        .from(".contact-form-container", { // سنحتاج لإضافة هذا الكلاس
          opacity: 0,
          x: -50, // يأتي من اليسار
          duration: 0.8,
          ease: 'power2.out'
        }, "<"); // "<" تعني "ابدأ مع الأنيميشن السابق"
    }
  }


  private initHeroAnimation(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (gsap.getTweensOf(".hero-word").length > 0) return;
      const heroWords = gsap.utils.toArray('.hero-word');
      const heroParagraph = document.querySelector('.hero-paragraph');

      const reversedHeroWords = heroWords.reverse();

      const tl = gsap.timeline();

      tl.from(reversedHeroWords, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.2
      });

      tl.from(heroParagraph, {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
      }, "-=0.4");
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

    // إذا كان التاب الجديد هو "إنتاج اعلامي"، قم بتعيين الفيديو الأول كنشط
    if (service.title === 'إنتاج اعلامي' && service.portfolio && service.portfolio.length > 0) {
      this.activeVideoItem.set(service.portfolio[0]);
    } else {
      this.activeVideoItem.set(null); // قم بإلغاء التعيين للخدمات الأخرى
    }
  }

  setActiveVideo(project: Project): void {
    this.activeVideoItem.set(project);
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