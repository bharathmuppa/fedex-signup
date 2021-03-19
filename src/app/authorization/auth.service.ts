import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/models/i-user.model';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

    return this.http.post<boolean>(`${environment.apiUrl}`, user, { observe: 'response' }).pipe(map((response) =>
      response.status === 200
    ), catchError((err) =>
      of(false)
    )
    );

  }
}
