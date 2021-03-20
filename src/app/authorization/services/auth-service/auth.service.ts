// Copyright Fedex 2021

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

import { IUser } from '../../../shared/models/i-user.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * Registers a new user
   *
   * @param user details to register
   * @returns status of the registration
   */
  public registerUser(user: IUser): Observable<boolean> {

    return this.http.post<boolean>(`${environment.apiUrl}`, user, { observe: 'response' }).pipe(
      timeout(1000),
      map((response: HttpResponse<boolean>) => response.status === 200)
    );

  }
}
