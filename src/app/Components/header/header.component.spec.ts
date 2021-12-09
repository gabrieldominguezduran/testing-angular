import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

class TemporalCOmponentForRoutes {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: TemporalCOmponentForRoutes,
          },
        ]),
      ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should cretae', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('home');

    expect(spy).toHaveBeenCalledWith('home');
  });
  it('should navigate to login', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('login');

    expect(spy).toHaveBeenCalledWith('login');
  });
  it('should navigate to register', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('register');

    expect(spy).toHaveBeenCalledWith('register');
  });
  it('should navigate to posts', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('posts');

    expect(spy).toHaveBeenCalledWith('posts');
  });
  it('should navigate to categories', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('categories');

    expect(spy).toHaveBeenCalledWith('categories');
  });
  it('should navigate to profile', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.navigationTo('profile');

    expect(spy).toHaveBeenCalledWith('profile');
  });
});
