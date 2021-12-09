import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CategoryDTO } from '../Models/category.dto';
import { CategoryService } from './category.service';

const categoriesList: CategoryDTO[] = [
  {
    userId: '',
    categoryId: '1',
    css_color: '',
    description: '',
    title: '',
  },
  {
    userId: '',
    categoryId: '2',
    css_color: '',
    description: '',
    title: '',
  },
  {
    userId: '',
    categoryId: '3',
    css_color: '',
    description: '',
    title: '',
  },
];

const singleCategory: CategoryDTO = {
  userId: '',
  categoryId: '1',
  css_color: '',
  description: '',
  title: '',
};

const newCategory: CategoryDTO = {
  userId: '1',
  categoryId: '4',
  css_color: '#E53419',
  description: 'test category',
  title: 'test',
};

const updateCategory: CategoryDTO = {
  userId: '1',
  categoryId: '4',
  css_color: '#E53419',
  description: 'test category updated',
  title: 'test update',
};

interface deleteResponse {
  affected: number;
}

describe('CategoryService', () => {
  let service: CategoryService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GET method and getCategoriesByUserId return a list of categories', () => {
    service.getCategoriesByUserId('1').subscribe((resp: CategoryDTO[]) => {
      expect(resp).toEqual(categoriesList);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/categories/1');

    expect(req.request.method).toBe('GET');

    req.flush(categoriesList);
  });

  it('POST method and createCategory create a new categoty', () => {
    service
      .createCategory({
        userId: '1',
        categoryId: '4',
        css_color: '#E53419',
        description: 'test category',
        title: 'test',
      })
      .subscribe((resp: CategoryDTO) => {
        expect(resp).toEqual(newCategory);
      });

    const req = httpMock.expectOne('http://localhost:3000/categories');

    expect(req.request.method).toBe('POST');

    req.flush(newCategory);
  });

  it('GET method and getCategoryById return one category', () => {
    service.getCategoryById('1').subscribe((resp: CategoryDTO) => {
      expect(resp).toEqual(singleCategory);
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');

    expect(req.request.method).toBe('GET');

    req.flush(singleCategory);
  });

  it('PUT method and updateCategory update the categoty', () => {
    service
      .updateCategory('4', {
        userId: '1',
        categoryId: '4',
        css_color: '#E53419',
        description: 'test category updated',
        title: 'test update',
      })
      .subscribe((resp: CategoryDTO) => {
        expect(resp).toEqual(updateCategory);
      });

    const req = httpMock.expectOne('http://localhost:3000/categories/4');

    expect(req.request.method).toBe('PUT');

    req.flush(updateCategory);
  });

  it('DELETE method and deleteCategory delete category', () => {
    service.deleteCategory('1').subscribe((resp: deleteResponse) => {
      expect(resp).toBeTruthy;
    });

    const req = httpMock.expectOne('http://localhost:3000/categories/1');

    expect(req.request.method).toBe('DELETE');
  });
});
