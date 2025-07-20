import { Injectable } from '@angular/core';

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

export interface Project {
  id: string;
  media: MediaItem[];
  coverImage?: string;
  layout?: 'grid' | 'default';
  details: { partner: string; client: string; type: string; };
}

export interface Service {
  title: string;
  linkText: string;
  portfolio?: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private services: Service[] = [
    {
      title: 'تصاميم جرافيك',
      linkText: 'اضغط للمعاينة',
      portfolio: [
        {
          id: 'graphics-project-1',
          media: [
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' }
          ],
          // --- تم إصلاح هذا الجزء ---
          details: { partner: 'شركة مراكيز', client: 'تربس', type: 'إعلانات سوشيال ميديا' }
        },
        {
          id: 'graphics-project-2',
          media: [
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - شكر وتقدير_.png' }
          ],
          // --- تم إصلاح هذا الجزء ---
          details: { partner: 'شركة ألفا', client: 'نمو', type: 'تصميم هوية بصرية' }
        }
      ]
    },
    {
      title: 'ويب سايت',
      linkText: 'اضغط للمعاينة',
      portfolio: [
        {
          id: 'website-project-1',
          media: [{ type: 'image', src: 'https://i.imgur.com/uCjL9fQ.png' }],
          details: { partner: 'العميل', client: 'المشروع', type: 'تطوير موقع' }
        }
      ]
    },
    {
      title: 'إنتاج اعلامي',
      linkText: 'اضغط للمعاينة',
      portfolio: [
        {
          id: 'video-project-1',
          media: [
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-1164-large.mp4' },
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-the-spheres-of-a-trinitarian-clock-42872-large.mp4' },
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-pale-hornet-moth-in-a-close-up-shot-48842-large.mp4' },
            { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-marketing-and-business-plan-34139-large.mp4' }
          ],
          // --- تم إصلاح هذا الجزء ---
          details: { partner: 'استديو فيستا', client: 'خاص', type: 'فيديوهات ترويجية' }
        }
      ]
    },
    {
      title: 'براندق',
      linkText: 'اضغط للمعاينة',
      portfolio: [
        {
          id: 'branding-project-1',
          layout: 'grid',
          coverImage: 'https://i.imgur.com/K5aE8v7.png',
          media: [
            { type: 'image', src: 'https://i.imgur.com/z4iJtY9.png' },
            { type: 'image', src: 'https://i.imgur.com/8QG3cSA.png' },
            { type: 'image', src: 'https://i.imgur.com/tC7gL0p.png' },
            { type: 'image', src: 'https://i.imgur.com/o15A1hN.png' }
          ],
          details: { partner: 'اسم العميل', client: 'براندق 1', type: 'بناء هوية' }
        },
        {
          id: 'branding-project-2',
          layout: 'grid',
          coverImage: 'https://i.imgur.com/5u9b2bH.png',
          media: [
            { type: 'image', src: 'https://i.imgur.com/g0n4A6m.png' },
            { type: 'image', src: 'https://i.imgur.com/uP2A1rN.png' },
            { type: 'image', src: 'https://i.imgur.com/Hn2yLg7.png' },
            { type: 'image', src: 'https://i.imgur.com/qE4JvRj.png' }
          ],
          details: { partner: 'عميل آخر', client: 'براندق 2', type: 'إعادة تصميم هوية' }
        },
        {
          id: 'branding-project-3',
          layout: 'grid',
          coverImage: 'https://i.imgur.com/5u9b2bH.png',
          media: [
            { type: 'image', src: 'https://i.imgur.com/g0n4A6m.png' },
            { type: 'image', src: 'https://i.imgur.com/uP2A1rN.png' },
            { type: 'image', src: 'https://i.imgur.com/Hn2yLg7.png' },
            { type: 'image', src: 'https://i.imgur.com/qE4JvRj.png' }
          ],
          details: { partner: 'عميل آخر', client: 'براندق 3', type: 'إعادة تصميم هوية' }
        },
        {
          id: 'branding-project-4',
          layout: 'grid',
          coverImage: 'https://i.imgur.com/5u9b2bH.png',
          media: [
            { type: 'image', src: 'https://i.imgur.com/g0n4A6m.png' },
            { type: 'image', src: 'https://i.imgur.com/uP2A1rN.png' },
            { type: 'image', src: 'https://i.imgur.com/Hn2yLg7.png' },
            { type: 'image', src: 'https://i.imgur.com/qE4JvRj.png' }
          ],
          details: { partner: 'عميل آخر', client: 'براندق 4', type: 'إعادة تصميم هوية' }
        },
      ]
    }
  ];

  constructor() { }

  getServices(): Service[] {
    return this.services;
  }

  getProjectById(id: string): Project | undefined {
    for (const service of this.services) {
      if (service.portfolio) {
        const foundProject = service.portfolio.find(p => p.id === id);
        if (foundProject) {
          return foundProject;
        }
      }
    }
    return undefined;
  }
}
