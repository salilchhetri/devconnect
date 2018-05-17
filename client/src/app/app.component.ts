import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { UsersService } from "./users.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  users;
  api: string = "api/users/all";

  constructor(private userService: UsersService, private http: HttpClient) {}

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  getUsers() {
    this.getUser().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }
}
