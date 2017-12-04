import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { ExitGuard } from "./exit/exit.guard";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe
  ],
  providers: [
    AuthService,
    AuthGuard,
    ExitGuard
  ],
  exports: [
    CityPipe
  ]
})
export class SharedModule { }
