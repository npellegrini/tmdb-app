import { Component, OnInit } from '@angular/core';

import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  private guestSessionResponse:{success:boolean,guest_session_id:string};

  constructor(private authenticationService:AuthenticateService){
  }

  login(){
    this.authenticationService.createGuestSessionId()
    .subscribe(res => {
      this.guestSessionResponse=res;
      if(this.guestSessionResponse.success){
        this.storageGuestSession();
      }
    }
  )
}

logout(){
  this.authenticationService.logout();
}

storageGuestSession(){
  this.authenticationService.storageGuestSession(this.guestSessionResponse.guest_session_id);
}

ngOnInit() {
}

}
