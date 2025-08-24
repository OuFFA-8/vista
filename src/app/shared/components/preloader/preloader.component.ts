import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';
import { AnimationService } from '../../../core/services/animation/animation.service';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private animationService = inject(AnimationService);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.runPreloaderAnimation();
    }
  }

  private runPreloaderAnimation(): void {
    // 1. تعريف العداد ككائن
    const counter = { value: 0 };
    const counterElement = document.querySelector('.counter');
    const logoMask = document.querySelector('.logo-mask');
    const preloader = document.querySelector('.preloader');

    const tl = gsap.timeline({
      // 3. إضافة onComplete للـ timeline
      onComplete: () => {
        // عندما ينتهي الأنيميشن بالكامل، قم بتحديث الخدمة
        this.animationService.preloaderFinished.set(true);
      }
    });

    // 3. الأنيميشن المتزامن (العداد والامتلاء)
    tl.to(counter, {
      duration: 2.5, // مدة التحميل (بالثواني)
      value: 100,
      roundProps: 'value', // اجعل القيمة عددًا صحيحًا
      ease: 'power1.inOut',
      onUpdate: () => {
        if (counterElement) {
          counterElement.textContent = `${counter.value}%`;
        }
      }
    })
      .to(logoMask, {
        duration: 2.5, // نفس مدة العداد
        height: 0,
        ease: 'power1.inOut'
      }, "<"); // "<" تعني "ابدأ مع الأنيميشن السابق"

    // 4. أنيميشن الخروج
    tl.to(preloader, {
      duration: 0.8,
      yPercent: -100, // انزلاق للأعلى
      ease: 'power2.in',
      delay: 0.3 // تأخير بسيط قبل الخروج
    });
  }
}