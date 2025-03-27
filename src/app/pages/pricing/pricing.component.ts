import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingComponent implements OnInit {
  private title = inject(Title);
  
    private meta = inject(Meta);
    ngOnInit(): void {
      this.title.setTitle('Pricing Page');
      this.meta.updateTag({name: 'description', content: 'Pricing Page'}); 
    }
 }
