import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import {UserService} from "../services/user.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {User} from "../user";

fdescribe('TokenInterceptor', () => {
  let service : UserService;
  let httpMock : HttpTestingController;
  let authUser : User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpClientTestingModule)
  });

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it("user should be authenticated", () => {
    let user : User = {
      userName: "leeharper",
      password: "passwordHarper",
      firstName: "lee",
      lastName: "Harper",
      email: "test"
    };

    service.userLogin(user).subscribe(dbUser => authUser = dbUser);

    const httpRequest = httpMock.expectOne("http://localhost:8080/user-login");
    expect(httpRequest.request.headers.has("Authorization")).toEqual(true);
  });
});
