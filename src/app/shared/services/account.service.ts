import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, END_POINT } from 'src/assets/global_urls';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient) { }

  /**
   * The getUsers function makes an HTTP GET request to retrieve a list of users from a server.
   */
  public getUsers(): any {
    return this.httpClient.get('http://localhost:8001/users')
  }

  public login(user: any): any{
    return this.httpClient.post(BASE_URL+END_POINT.LOGIN, user)
  }

  public refresh(token: any): any{
    return this.httpClient.post(BASE_URL+END_POINT.REFRESH_TOKEN, token)
  }

  public registerUser(data:any): any{
    let payload = {
      "firstName": data.firstName,
      "lastName": data.lastName,
      "email": data.email,
      "phone": data.phone,
      "gender": data.gender,
      "password": data.password,
      "role":"Guest"
    }
    const endpoint = `${BASE_URL + END_POINT. REGISTER_USER}`;
    return this.httpClient.post(endpoint, payload);
  }
}
