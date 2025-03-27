import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent  implements OnInit {
  private title = inject(Title);
  
    private meta = inject(Meta);
    ngOnInit(): void {
      this.title.setTitle('Contact Page');
      this.meta.updateTag({name: 'description', content: 'Contact Page'}); 
    }
 }
