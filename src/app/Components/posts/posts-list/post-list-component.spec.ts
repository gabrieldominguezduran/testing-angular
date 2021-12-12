import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostDTO } from 'src/app/Models/post.dto';
import { PostService } from 'src/app/Services/post.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { PostsListComponent } from './posts-list.component';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PostsListComponent],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadPosts success from subscription', () => {
    const postsService = fixture.debugElement.injector.get(PostService);

    const listPosts: PostDTO[] = [];

    const localStorageService =
      fixture.debugElement.injector.get(LocalStorageService);
    localStorageService.set('user_id', '1');

    spyOn(localStorageService, 'get').and.returnValue('user_id');
    const spy = spyOn(postsService, 'getPostsByUserId')
      .withArgs('user_id')
      .and.returnValue(of(listPosts));

    component['loadPosts']();

    expect(spy).toHaveBeenCalled();

    expect(component.posts.length).toBe(0);
  });

  it('should navigate to the post when create a new one', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.createPost();

    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to the post when update one', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigateByUrl');

    component.updatePost('1');

    expect(spy).toHaveBeenCalled();
  });
});
