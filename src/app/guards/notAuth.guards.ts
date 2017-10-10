import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

   constructor(
      private authenticateService: AuthenticateService,
      private router: Router
   ) { }

   canActivate() {
      if (this.authenticateService.isLoggedIn()) {
         this.router.navigate(['/home']);
         return false;
      } else {
         return true;
      }
   }
}
