import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(
      private authenticateService: AuthenticateService,
      private router: Router
   ) { }

   canActivate() {
      if (this.authenticateService.isLoggedIn()) {
         return true;
      } else {
         this.router.navigate(['/identify']);
         return false;
      }
   }
}
