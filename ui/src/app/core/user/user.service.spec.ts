/*
 * Copyright (c) 2020 the original author or authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { AppUser } from '../../data/interfaces/app-user';
import { Role } from 'src/app/data/enums/role.enum';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return set of users', () => {
    const mock = [{
      id: 0,
      organizationId: 'ksdfklsn1111111',
      firstName: 'John',
      lastName: 'Malkovich',
      role: Role.USER
    }, {
      id: 1,
      organizationId: 'ksdfklsn1111111',
      firstName: 'Tony',
      lastName: 'Stark',
      role: Role.ADMINISTRATOR
    }];

    service.getAll('organizationId').subscribe((data: AppUser[]) => {
      expect(data[0].role).toBe(mock[0].role);
      expect(data[0].firstName).toBe(mock[0].firstName);
      expect(data[0].lastName).toBe(mock[0].lastName);
      expect(data[1].role).toBe(mock[1].role);
      expect(data[1].firstName).toBe(mock[1].firstName);
      expect(data[1].lastName).toBe(mock[1].lastName);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}org/organizationId/roles`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should update user role', () => {
    const mock = {
      id: 'userId',
      organizationId: 'ksdfklsn1111111',
      firstName: 'John',
      lastName: 'Malkovich',
      role: Role.USER
    };

    service.updateRole('organizationId', 'userId', Role.USER).subscribe((data: AppUser) => {
      expect(data.role).toBe(mock.role);
      expect(data.firstName).toBe(mock.firstName);
      expect(data.lastName).toBe(mock.lastName);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}org/organizationId/role`);
    expect(req.request.method).toBe('PUT');
    req.flush(mock);
  });
});
