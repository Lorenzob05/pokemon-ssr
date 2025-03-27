import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent implements OnInit {

  private title = inject(Title);

  private meta = inject(Meta);
  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({name: 'description', content: 'About Page'}); 
  }
 }
