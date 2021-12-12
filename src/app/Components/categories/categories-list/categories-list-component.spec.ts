import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService } from 'src/app/Services/category.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CategoriesListComponent } from './categories-list.component';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CategoriesListComponent],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadCategories success from subscription', () => {
    const categoriesService =
      fixture.debugElement.injector.get(CategoryService);

    const listCategories: CategoryDTO[] = [];

    const localStorageService =
      fixture.debugElement.injector.get(LocalStorageService);
    localStorageService.set('user_id', '1');

    spyOn(localStorageService, 'get').and.returnValue('user_id');
    const spy = spyOn(categoriesService, 'getCategoriesByUserId')
      .withArgs('user_id')
      .and.returnValue(of(listCategories));

    component['loadCategories']();

    expect(spy).toHaveBeenCalled();

    expect(component.categories.length).toBe(0);
  });

  it('should navigate to the catgory when create a new one', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.createCategory();

    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to the category when update one', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.updateCategory('1');

    expect(spy).toHaveBeenCalled();
  });
});
