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
    const counter = { value: 0 };

    const counterValueElement = document.querySelector('.counter-value');

    const logoMask = document.querySelector('.logo-mask');
    const preloader = document.querySelector('.preloader');

    const tl = gsap.timeline({
      onComplete: () => {
        this.animationService.preloaderFinished.set(true);
      }
    });

    tl.to(counter, {
      duration: 2.5,
      value: 100,
      roundProps: 'value',
      ease: 'power1.inOut',
      onUpdate: () => {
        // --- START: تم تعديل هذا الجزء ---
        // تحديث نص الأرقام فقط
        if (counterValueElement) {
          counterValueElement.textContent = `${counter.value}`;
        }
        // --- END: نهاية التعديل ---
      }
    })
      .to(logoMask, {
        duration: 2.5,
        height: 0,
        ease: 'power1.inOut'
      }, "<")
      .to(preloader, {
        duration: 0.8,
        yPercent: -100,
        ease: 'power2.in',
        delay: 0.3
      });
  }
}