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
});
