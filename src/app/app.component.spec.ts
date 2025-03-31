import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent;
  let compiled: HTMLDivElement;

  @Component({
    selector: 'app-navbar',
    standalone: true
  })
  class NavbarComponentMock {}

  beforeEach(async () => {

    // TestBed.overrideComponent(AppComponent, {
    //   set: {
    //     imports: [NavbarComponentMock],
    //     schemas:[CUSTOM_ELEMENTS_SCHEMA]
    //   }
    // })

    //!Recomendado
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([])
      ],
    })
    // Esto se hace para utilizar el componente mock en lugar del componente real
    .overrideComponent(AppComponent, {
      add: {
        imports: [NavbarComponentMock]
      },
      remove: {
        imports: [NavbarComponent]
      }
    })
    .compileComponents();
    // .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLDivElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    // expect(true).toBeFalse();
  });

  it(`should render the navbar and router-oulet`, () => {
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  // });
});
