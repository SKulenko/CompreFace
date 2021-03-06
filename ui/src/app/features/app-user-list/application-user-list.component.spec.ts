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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ApplicationUserListComponent} from './application-user-list.component';
import {SpinnerModule} from '../spinner/spinner.module';
import {UserTableModule} from '../user-table/user-table.module';
import {ApplicationUserListFacade} from './application-user-list-facade';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material';
import {InviteUserModule} from '../invite-user/invite-user.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {UserTablePipeModule} from '../../ui/search-pipe/user-table-filter.module';
import {MatInputModule} from '@angular/material/input';
import {SnackBarModule} from 'src/app/features/snackbar/snackbar.module';

describe('ApplicationUserListComponent', () => {
  let component: ApplicationUserListComponent;
  let fixture: ComponentFixture<ApplicationUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationUserListComponent ],
      imports: [
        SpinnerModule,
        UserTableModule,
        InviteUserModule,
        NoopAnimationsModule,
        FormsModule,
        UserTablePipeModule,
        MatInputModule,
        SnackBarModule
      ],
      providers: [{
        provide: MatDialog,
        useValue: {}
      }, {
        provide: ApplicationUserListFacade,
        useValue: {
          initSubscriptions: () => of([{}]),
          appUsers$: of([{
            id: 0,
            name: 'name',
            owner: {
              firstname: 'firstname'
            }
          }]),
          selectedOrganization$: of([{}]),
          isLoading$: of([{}]),
          availableRoles$: of([{}]),
          unsubscribe() {
          }
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
