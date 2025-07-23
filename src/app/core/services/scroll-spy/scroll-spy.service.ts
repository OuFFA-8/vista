import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
  public activeSectionId = signal<string>('');
  
  constructor() { }
}
