import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  imports: [],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css'
})
export class ContactSectionComponent {

  private platformId = inject(PLATFORM_ID);

  constructor() {
    // استخدم afterNextRender لضمان أن الأنيميشن يعمل بعد رسم الكومبوننت
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.initAnimation();
      }
    });
  }

  private initAnimation(): void {
    // أنيميشن قسم التواصل
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section-trigger", // سنضيف هذا الكلاس في HTML
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    contactTl.from(".contact-text-content", {
        opacity: 0,
        x: 50, // يأتي من اليمين
        duration: 0.8,
        ease: 'power2.out'
      })
      .from(".contact-form-container", {
        opacity: 0,
        x: -50, // يأتي من اليسار
        duration: 0.8,
        ease: 'power2.out'
      }, "<");
  }

}
