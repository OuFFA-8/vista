import { Component, OnInit, PLATFORM_ID, Inject, afterNextRender, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { NavbarComponent } from "./layout/navbar/navbar.component";
import { ContactSectionComponent } from './shared/components/contact-section/contact-section.component';
import { LightboxComponent } from './shared/components/lightbox/lightbox.component';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
import { ScrollSpyService } from './core/services/scroll-spy/scroll-spy.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    ContactSectionComponent,
    PreloaderComponent,
    LightboxComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  private scrollSpyService = inject(ScrollSpyService);
  private router = inject(Router);

  constructor() {
    // 4. أعدنا هذا المنطق المهم "فقط"
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const isHomePage = (event.urlAfterRedirects.startsWith('/home') || event.urlAfterRedirects === '/');
      
      // إذا لم نكن في الصفحة الرئيسية، قم بإعادة تعيين الـ Scroll Spy
      if (!isHomePage) {
        // هذا السطر يحل المشكلة: هو "يُطفئ" أي تفعيل قديم من الـ Scroll Spy،
        // ويترك المجال لـ routerLinkActive ليعمل بحرية في الصفحات الداخلية.
        this.scrollSpyService.activeSectionId.set('NOT_HOME'); // استخدم أي قيمة مميزة لا تساوي ''
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }

  private initContactAnimation(): void {
    // تأكد من وجود قسم التواصل قبل محاولة تحريكه
    const contactSection = document.querySelector('#contact');
    if (!contactSection) return;

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    contactTl.from(".contact-text-content", {
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: 'power2.out'
    })
      .from(".contact-form-container", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power2.out'
      }, "<");
  }
}