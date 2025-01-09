import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private accessToken: string = environment.theMovieDbToken;

  getToken(): string {
    return this.accessToken;
  }

  setToken(token: string): void {
    this.accessToken = token;
  }
}
