import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  backendErrors = {};

  constructor(
    private registerService: RegisterService
  ) { }

  ngOnInit() {
  }

  register(event) {
    event.preventDefault();
    this.registerService.registerUser(this.name, this.email, this.password, this.confirmPassword)
      .subscribe(
        (val) => {
          console.log("Registered",
            val);
        },
        response => {
          this.backendErrors = response.error;
        },
        () => {
          console.log("Registration is now completed.");
        }
      )
  }

}
