import { TestBed } from '@angular/core/testing';

import { LoadingScreenInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingScreenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadingScreenInterceptor = TestBed.inject(LoadingScreenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
