import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Client, PortfolioService } from '../../core/services/portfolio/portfolio.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, AfterViewInit {
  // --- 1. تعريف الخصائص بدون 'inject' هنا ---
  private platformId: Object;
  private portfolioService: PortfolioService;
  
  clients: Client[] = [];

  // --- 2. القيام بالحقن داخل الـ constructor ---
  constructor() {
    this.platformId = inject(PLATFORM_ID);
    this.portfolioService = inject(PortfolioService);
  }

  ngOnInit(): void {
    const allClients = this.portfolioService.getClients();
    this.clients = [...allClients, ...allClients];
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private initAnimations(): void {
    // أنيميشن قسم الـ Hero
    gsap.from('.hero-text-content', {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out'
    });

    gsap.from('.vision-image', {
      scrollTrigger: {
        trigger: '.vision-image',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 1,
      x: 50, // الصورة الآن تأتي من اليمين
      opacity: 0,
      ease: 'power2.out'
    });
    gsap.from('.vision-text', {
      scrollTrigger: {
        trigger: '.vision-text',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 1,
      x: -50, // النص الآن يأتي من اليسار
      opacity: 0,
      ease: 'power2.out'
    });

    // أنيميشن قسم القيم الأساسية (لا يتغير)
    gsap.from('.core-value', {
      scrollTrigger: {
        trigger: '.core-value',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 0.8, y: 40, opacity: 0, stagger: 0.2, ease: 'power2.out'
    });
  }
}