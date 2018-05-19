import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterService } from '../../services/register.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule,
  ],
  declarations: [RegisterComponent],
  providers: [
    RegisterService
  ]
})
export class RegisterModule { }
