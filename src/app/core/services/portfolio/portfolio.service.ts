import { Injectable } from '@angular/core';

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

export interface Project {
  id: string;
  media: MediaItem[];
  coverImage?: string;
  layout?: 'grid' | 'default' | 'focus-grid'; 
  details?: { partner: string; client: string; type: string; };
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
          layout: 'focus-grid',
          media: [
            { type: 'image', src: '/images/تربس/تصاميم تربس_8.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس_4.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس_2.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس - رمضان_12.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس - رمضان_12 copy 4.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس - رمضان_12 copy 18.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس - رمضان_12 copy 17.webp' }
          ],
        },
        {
          id: 'graphics-project-2',
          layout: 'focus-grid',
          media: [
            { type: 'image', src: '/images/الامباط العقارية/2 copy 10.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 4.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 9.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 12.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 13.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 14.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 16.webp ' }
          ],
          details: { partner: 'شركة ألفا', client: 'نمو', type: 'تصميم هوية بصرية' }
        },
        {
          id: 'graphics-project-3',
          layout: 'focus-grid',
          media: [
            { type: 'image', src: '/images/الريادة قروب/1.webp ' },
            { type: 'image', src: '/images/الريادة قروب/2.webp ' },
            { type: 'image', src: '/images/الريادة قروب/7.webp ' },
            { type: 'image', src: '/images/الريادة قروب/8.webp ' },
            { type: 'image', src: '/images/الريادة قروب/9.webp ' },
            { type: 'image', src: '/images/الريادة قروب/11.webp ' },
            { type: 'image', src: '/images/الريادة قروب/12.webp ' }
          ],
          details: { partner: 'شركة ألفا', client: 'نمو', type: 'تصميم هوية بصرية' }
        },
        {
          id: 'graphics-project-4',
          layout: 'focus-grid',
          media: [
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - معرض copy 2.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٣ - ختام ناجح لمعرض كاش إكسبو.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/معرض.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/١ - انستقرام - صور بقالب.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/٧.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/٨.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/٩.webp' }
          ],
          details: { partner: 'شركة ألفا', client: 'نمو', type: 'تصميم هوية بصرية' }
        },
        {
          id: 'graphics-project-5',
          layout: 'focus-grid',
          media: [
            { type: 'image', src: '/images/مدينة الملك عبدالله/انفو جرافيك 3 copy.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/تصميم الاستدامة copy 2.webp ' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/مصادر copy 2.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/مصادر copy 3.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/مصادر copy 4.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/موشن جرافيك copy 2.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/يوم الشباب-1.webp' }
          ],
          details: { partner: 'شركة ألفا', client: 'نمو', type: 'تصميم هوية بصرية' }
        },
        {
          id: 'graphics-project-6',
          layout: 'focus-grid',
          media: [
            { type: 'image', src: '/images/دانكن/Artboard 1 (1).webp' },
            { type: 'image', src: '/images/دانكن/Artboard 1.webp' },
            { type: 'image', src: '/images/دانكن/الزعفران.webp' },
            { type: 'image', src: '/images/دانكن/اللمه الحلوة.webp' },
            { type: 'image', src: '/images/دانكن/تهنئة العيد دانكن.webp' },
            { type: 'image', src: '/images/دانكن/صباحات دانكن.webp' },
            { type: 'image', src: '/images/دانكن/نفهم جوك.webp' }
          ],
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
          media: [{ type: 'image', src: '/images/مواقع/الامبااط -١-.webp' }],
          details: { partner: 'العميل', client: 'المشروع', type: 'تطوير موقع' }
        },
        {
          id: 'website-project-1',
          media: [{ type: 'image', src: '/images/مواقع/الزامل والخراشي -٢-.webp' }],
          details: { partner: 'العميل', client: 'المشروع', type: 'تطوير موقع' }
        },
        {
          id: 'website-project-1',
          media: [{ type: 'image', src: '/images/مواقع/الزاملية -١.webp' }],
          details: { partner: 'العميل', client: 'المشروع', type: 'تطوير موقع' }
        },
        {
          id: 'website-project-1',
          media: [{ type: 'image', src: '/images/مواقع/دار العقارية ة.webp' }],
          details: { partner: 'العميل', client: 'المشروع', type: 'تطوير موقع' }
        },
      ]
    },
    {
      title: 'إنتاج اعلامي',
      linkText: 'اضغط للمعاينة',
      portfolio: [
        {
          id: 'video-project-1',
          media: [
            { type: 'video', src: '/images/إنتاج إعلامي/رواد جادة الابتكار، فيديو الرياض.mp4' },
            { type: 'video', src: '/images/إنتاج إعلامي/رواد جادة الابتكار، فيديو معرض الإطلاق 1.mp4' },
            { type: 'video', src: '/images/إنتاج إعلامي/هاكثون المدينة - المسارات 4.mp4' },
            { type: 'video', src: '/images/إنتاج إعلامي/جمعية تحفيظ القران المدينة المنورة Full Modify (1).mp4' },
          ],
          // --- تم إصلاح هذا الجزء ---
          details: { partner: 'استديو فيستا', client: 'خاص', type: 'فيديوهات ترويجية' }
        },
        {
          id: 'video-project-1',
          media: [
            { type: 'video', src: '/images/إنتاج إعلامي/مجلس الجمعيات الاهلية مؤثرات.mp4' },
            { type: 'video', src: '/images/إنتاج إعلامي/كفالة يتيم جاهز (1).mp4' },
            { type: 'video', src: '/images/إنتاج إعلامي/امور الحياة03.mp4' },
            { type: 'video', src: '/images/إنتاج إعلامي/الدخول لموقع الشامل.mp4' },
          ],
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
          coverImage: '/images/Hawweat/4/٧-03.webp',
          media: [
            { type: 'image', src: '/images/Hawweat/4/٧-01.webp' },
            { type: 'image', src: '/images/Hawweat/4/٧-02.webp' },
            { type: 'image', src: '/images/Hawweat/4/٧-03.webp' },
            { type: 'image', src: '/images/Hawweat/4/٧-05.webp' }
          ],
          details: { partner: 'اسم العميل', client: 'براندق 1', type: 'بناء هوية' }
        },
        {
          id: 'branding-project-2',
          layout: 'grid',
          coverImage: '/images/Hawweat/3/1.webp',
          media: [
            { type: 'image', src: '/images/Hawweat/3/1.webp' },
            { type: 'image', src: '/images/Hawweat/3/2.webp' },
            { type: 'image', src: '/images/Hawweat/3/3.webp' },
            { type: 'image', src: '/images/Hawweat/3/4.webp' },
            { type: 'image', src: '/images/Hawweat/3/6.webp' },
            { type: 'image', src: '/images/Hawweat/3/5.webp' }
          ],
          details: { partner: 'عميل آخر', client: 'براندق 2', type: 'إعادة تصميم هوية' }
        },
        {
          id: 'branding-project-3',
          layout: 'grid',
          coverImage: '/images/Hawweat/2/9-01.webp',
          media: [
            { type: 'image', src: '/images/Hawweat/2/9-01.webp' },
            { type: 'image', src: '/images/Hawweat/2/9-02.webp' },
            { type: 'image', src: '/images/Hawweat/2/9-03.webp' },
            { type: 'image', src: '/images/Hawweat/2/9-04.webp' },
            { type: 'image', src: '/images/Hawweat/2/9-05.webp' },
          ],
          details: { partner: 'عميل آخر', client: 'براندق 3', type: 'إعادة تصميم هوية' }
        },
        {
          id: 'branding-project-4',
          layout: 'grid',
          coverImage: '/images/Hawweat/1/8-01.webp',
          media: [
            { type: 'image', src: '/images/Hawweat/1/8-01.webp' },
            { type: 'image', src: '/images/Hawweat/1/8-02.webp' },
            { type: 'image', src: '/images/Hawweat/1/8-03.webp' },
            { type: 'image', src: '/images/Hawweat/1/8-05.webp' }
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
