import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PostDTO } from '../Models/post.dto';
import { PostService } from './post.service';

const postsList: PostDTO[] = [
  {
    postId: '1',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(),
    categories: [],
    userId: '',
    userAlias: '',
  },
  {
    postId: '2',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(),
    categories: [],
    userId: '',
    userAlias: '',
  },
  {
    postId: '3',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(),
    categories: [],
    userId: '',
    userAlias: '',
  },
];

const singlePost: PostDTO = {
  postId: '1',
  title: '',
  description: '',
  num_likes: 0,
  num_dislikes: 0,
  publication_date: new Date(),
  categories: [],
  userId: '',
  userAlias: '',
};

const newPost: PostDTO = {
  postId: '4',
  title: '',
  description: '',
  num_likes: 0,
  num_dislikes: 0,
  publication_date: new Date(),
  categories: [],
  userId: '',
  userAlias: '',
};

const updatePost: PostDTO = {
  postId: '1',
  title: '',
  description: '',
  num_likes: 0,
  num_dislikes: 0,
  publication_date: new Date(),
  categories: [],
  userId: '',
  userAlias: '',
};

interface updateResponse {
  affected: number;
}

interface deleteResponse {
  affected: number;
}

describe('PostService', () => {
  let service: PostService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GET method and getPosts return all posts', () => {
    service.getPosts().subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postsList);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');

    expect(req.request.method).toBe('GET');

    req.flush(postsList);
  });

  it('GET method and getPostsByUserId return a list of posts', () => {
    service.getPostsByUserId('1').subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postsList);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/posts/1');

    expect(req.request.method).toBe('GET');

    req.flush(postsList);
  });

  it('POST method and createPost create a new post', () => {
    service
      .createPost({
        postId: '4',
        title: '',
        description: '',
        num_likes: 0,
        num_dislikes: 0,
        publication_date: new Date(),
        categories: [],
        userId: '',
        userAlias: '',
      })
      .subscribe((resp: PostDTO) => {
        expect(resp).toEqual(newPost);
      });

    const req = httpMock.expectOne('http://localhost:3000/posts');

    expect(req.request.method).toBe('POST');

    req.flush(newPost);
  });

  it('GET method and getPostById return one post', () => {
    service.getPostById('1').subscribe((resp: PostDTO) => {
      expect(resp).toEqual(singlePost);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');

    expect(req.request.method).toBe('GET');

    req.flush(singlePost);
  });

  it('PUT method and updatePost update the post', () => {
    service
      .updatePost('1', {
        postId: '1',
        title: '',
        description: '',
        num_likes: 0,
        num_dislikes: 0,
        publication_date: new Date(),
        categories: [],
        userId: '',
        userAlias: '',
      })
      .subscribe((resp: PostDTO) => {
        expect(resp).toEqual(updatePost);
      });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');

    expect(req.request.method).toBe('PUT');

    req.flush(updatePost);
  });

  it('PUT method and likePost increase by one the likes in the post', () => {
    service.likePost('1').subscribe((resp: updateResponse) => {
      expect(resp).toBeTruthy;
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/like/1');

    expect(req.request.method).toBe('PUT');
  });

  it('PUT method and dislikePost decrease by one the likes in the post', () => {
    service.dislikePost('2').subscribe((resp: updateResponse) => {
      expect(resp).toBeTruthy;
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/dislike/2');

    expect(req.request.method).toBe('PUT');
  });

  it('DELETE method and deletePost delete post', () => {
    service.deletePost('1').subscribe((resp: deleteResponse) => {
      expect(resp).toBeTruthy;
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');

    expect(req.request.method).toBe('DELETE');
  });
});
