import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private titleService: Title
  ) { }

  public setMetaTags(tags) {
    tags = {
      title: 'ngFireUniversal',
      description: 'Angular Universal + Firebase + PWA = NgFireUniversal',
      image: 'https://i.imgur.com/HUtI2dw.png',
      slug: '',
      ...tags
    };

    this.titleService.setTitle(tags.title);

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ngFireUniversal' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({ name: 'twitter:description', content: tags.description });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'ngFireUniversal' });
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({ property: 'og:description', content: tags.description });
    this.meta.updateTag({ property: 'og:image', content: tags.image });
    this.meta.updateTag({ property: 'og:url', content: `https://ng-fire-universal.firebaseapp.com/${tags.slug}` });
  }

}
