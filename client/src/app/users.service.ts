import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UsersService {
  users: any[];
  api: string = "api/users/all";

  constructor(private http: HttpClient) {}
  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}
