import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterService {

  apiEndpoint: string = environment.api;

  constructor(private http: HttpClient) {
  }

  registerUser(name: string, email: string, password: string, password2: string): Observable<any> {
    const context = {
      email, password, name
    }
    return this.http.post((this.apiEndpoint + environment.register), { name, email, password, password2 })
  }

}
