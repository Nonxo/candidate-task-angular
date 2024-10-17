import { TestBed } from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../state/users/users.model';
import { environment } from '../../../environments/environment';
import {HttpErrorResponse, provideHttpClient} from "@angular/common/http";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting(), UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users', (done) => {
    const users: User[] = [
      { id: '1', avatar: '', name: 'John Doe', email: 'john@example.com', status: true, role: 'admin', createdAt: '2022-01-01' },
      { id: '2', avatar: '', name: 'Jane Doe', email: 'jane@example.com', status: true, role: 'user', createdAt: '2022-01-02' }
    ];

    service.fetchAllUsers().subscribe((response) => {
      expect(response).toEqual(users);
      done();
    });

    httpMock.expectOne(environment.baseUrl + '/v1/employees/fetch').flush(users);
  });


  it('should handle error', () => {
    service.fetchAllUsers().subscribe(

      () => fail('should not be called'),

      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe('Server Error');
      }
    );

    // Simulate an error response
    httpMock.expectOne(environment.baseUrl + '/v1/employees/fetch').flush('Server Error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
