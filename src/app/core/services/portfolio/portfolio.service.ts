import { Injectable } from '@angular/core';

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

export interface Project {
  id: string;
  media: MediaItem[];
  coverImage?: string;
  siteUrl?: string;
  layout?: 'grid' | 'default' | 'focus-grid';
  details?: { partner: string; client: string; type: string; };
}

export interface Service {
  title: string;
  linkText: string;
  portfolio?: Project[];
}

export interface Client {
  src: string;
  alt: string;
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
          coverImage: '/images/تربس/تصاميم تربس_8.webp',

          media: [
            { type: 'image', src: '/images/تربس/تصاميم تربس_8.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس_4.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس_2.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس - رمضان_12.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس - رمضان_12 copy 4.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس - رمضان_12 copy 18.webp' },
            { type: 'image', src: '/images/تربس/تصاميم تربس - رمضان_12 copy 17.webp' }
          ], details: { partner: 'شركة ألفا', client: 'تربس', type: 'تصميم هوية بصرية' }
        },
        {
          id: 'graphics-project-2',
          layout: 'focus-grid',
          coverImage: '/images/الامباط العقارية/2 copy 10.webp ',

          media: [
            { type: 'image', src: '/images/الامباط العقارية/2 copy 10.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 4.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 9.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 12.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 13.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 14.webp ' },
            { type: 'image', src: '/images/الامباط العقارية/2 copy 16.webp ' }
          ],
          details: { partner: 'شركة ألفا', client: 'الامباط العقارية', type: 'تصميم هوية بصرية' }
        },
        {
          id: 'graphics-project-3',
          layout: 'focus-grid',
          coverImage: '/images/الريادة قروب/1.webp ',

          media: [
            { type: 'image', src: '/images/الريادة قروب/1.webp ' },
            { type: 'image', src: '/images/الريادة قروب/2.webp ' },
            { type: 'image', src: '/images/الريادة قروب/7.webp ' },
            { type: 'image', src: '/images/الريادة قروب/8.webp ' },
            { type: 'image', src: '/images/الريادة قروب/9.webp ' },
            { type: 'image', src: '/images/الريادة قروب/11.webp ' },
            { type: 'image', src: '/images/الريادة قروب/12.webp ' }
          ],
          details: { partner: 'شركة ألفا', client: 'الريادة قروب', type: 'تصميم هوية بصرية' }
        },
        {
          id: 'graphics-project-4',
          layout: 'focus-grid',
          coverImage: '/images/معرض كاش اكسبو/- ٢ - معرض copy 2.webp',

          media: [
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٢ - معرض copy 2.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/- ٣ - ختام ناجح لمعرض كاش إكسبو.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/معرض.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/١ - انستقرام - صور بقالب.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/٧.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/٨.webp' },
            { type: 'image', src: '/images/معرض كاش اكسبو/٩.webp' }
          ],
          details: { partner: 'شركة ألفا', client: 'معرض كاش اكسبو', type: 'تصميم هوية بصرية' }
        },
        {
          id: 'graphics-project-5',
          layout: 'focus-grid',
          coverImage: '/images/مدينة الملك عبدالله/انفو جرافيك 3 copy.webp',

          media: [
            { type: 'image', src: '/images/مدينة الملك عبدالله/انفو جرافيك 3 copy.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/تصميم الاستدامة copy 2.webp ' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/مصادر copy 2.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/مصادر copy 3.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/مصادر copy 4.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/موشن جرافيك copy 2.webp' },
            { type: 'image', src: '/images/مدينة الملك عبدالله/يوم الشباب-1.webp' }
          ],
          details: { partner: 'شركة ألفا', client: 'مدينة الملك عبدالله', type: 'تصميم هوية بصرية' }
        },
        {
          id: 'graphics-project-6',
          layout: 'focus-grid',
          coverImage: '/images/دانكن/Artboard 1 (1).webp',

          media: [
            { type: 'image', src: '/images/دانكن/Artboard 1 (1).webp' },
            { type: 'image', src: '/images/دانكن/Artboard 1.webp' },
            { type: 'image', src: '/images/دانكن/الزعفران.webp' },
            { type: 'image', src: '/images/دانكن/اللمه الحلوة.webp' },
            { type: 'image', src: '/images/دانكن/تهنئة العيد دانكن.webp' },
            { type: 'image', src: '/images/دانكن/صباحات دانكن.webp' },
            { type: 'image', src: '/images/دانكن/نفهم جوك.webp' }
          ],
          details: { partner: 'شركة ألفا', client: 'دانكن', type: 'تصميم هوية بصرية' }
        }
      ]
    },
    {
      title: 'ويب سايت',
      linkText: 'اضغط للمعاينة',

      portfolio: [
        {
          id: 'website-project-1',
          media: [],
          coverImage: '/images/مواقع/الامبااط -١-.webp',
          siteUrl: 'https://ambatt.com.sa/',
          details: { partner: 'العميل', client: 'الامبااط', type: 'تطوير موقع' }
        },
        {
          id: 'website-project-1',
          media: [],
          coverImage: '/images/مواقع/الزامل والخراشي -٢-.webp',
          siteUrl: 'https://elzamel.vercel.app/home',
          details: { partner: 'العميل', client: 'الزامل والخراشي', type: 'تطوير موقع' }
        },
        {
          id: 'website-project-1',
          media: [],
          coverImage: '/images/مواقع/الزاملية -١.webp',
          siteUrl: 'https://alzamiliah.com/ar',
          details: { partner: 'العميل', client: 'الزاملية', type: 'تطوير موقع' }
        },
        {
          id: 'website-project-1',
          media: [],
          coverImage: '/images/مواقع/دار العقارية ة.webp',
          siteUrl: 'https://daralaqaria.com/ar',
          details: { partner: 'العميل', client: 'دار العقارية', type: 'تطوير موقع' }
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
            { type: 'video', src: '/images/إنتاج إعلامي/رواد جادة الابتكار، فيديو الرياض.mp4' }],
          details: { partner: 'استديو فيستا', client: 'خاص', type: 'فيديوهات ترويجية' }
        },
        {
          id: 'video-project-2',
          media: [{ type: 'video', src: '/images/إنتاج إعلامي/كفالة يتيم جاهز (1).mp4' }],
          details: { partner: 'استديو فيستا', client: 'خاص', type: 'فيديوهات ترويجية' }
        },
        {
          id: 'video-project-3',
          media: [{ type: 'video', src: '/images/إنتاج إعلامي/امور الحياة03.mp4' }],
          details: { partner: 'استديو فيستا', client: 'خاص', type: 'فيديوهات ترويجية' }
        },
        {
          id: 'video-project-4',
          media: [{ type: 'video', src: '/images/إنتاج إعلامي/الدخول لموقع الشامل.mp4' }],
          details: { partner: 'استديو فيستا', client: 'خاص', type: 'فيديوهات ترويجية' }
        },

      ]
    },
    {
      title: 'علامات تجارية',
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

  private clients = [
    { src: '/images/عملائنا/1.png', alt: 'Client Logo 1' }, { src: '/images/عملائنا/2.png', alt: 'Client Logo 2' },
    { src: '/images/عملائنا/3.png', alt: 'Client Logo 3' }, { src: '/images/عملائنا/4.png', alt: 'Client Logo 4' },
    { src: '/images/عملائنا/5.png', alt: 'Client Logo 5' }, { src: '/images/عملائنا/6.png', alt: 'Client Logo 6' },
    { src: '/images/عملائنا/7.png', alt: 'Client Logo 7' }, { src: '/images/عملائنا/8.png', alt: 'Client Logo 8' },
    { src: '/images/عملائنا/9.png', alt: 'Client Logo 9' }, { src: '/images/عملائنا/10.png', alt: 'Client Logo 10' },
    { src: '/images/عملائنا/11.png', alt: 'Client Logo 11' }, { src: '/images/عملائنا/12.png', alt: 'Client Logo 12' },
  ];

  constructor() { }

  getClients() {
    return this.clients;
  }

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
