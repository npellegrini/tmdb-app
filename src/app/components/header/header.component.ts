import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { ResourceLoader } from '@angular/compiler';
import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authenticateDomain = 'https://www.themoviedb.org/authenticate/';
  redirectTo = '?redirect_to=http://localhost:4200/login';

  request_token = localStorage.getItem('request_token');
  session_id;
  sessionBegin : boolean;
  buttonClass;

  constructor(
    private authenticateService: AuthenticateService,
    private route: ActivatedRoute,
    private router: Router) { }

  onClickLogIn() {
    this.authenticateService.getRequestToken()
      .subscribe(data => {
        this.request_token = data.request_token;
        this.authenticateService.storeRequestToken(this.request_token);
      });
    this.buttonClass = 'disabled';

    setTimeout(() => {
      this.authenticateService.logIn(this.request_token);
    }, 2000);
  }

  onClickLogOut() {
    this.authenticateService.logOut();
    this.router.navigate(['/home']);
    localStorage.setItem('session_started', 'no');
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
        let userId = params['userId'];
        console.log(userId);
      });

    this.authenticateService.getSessionId(this.request_token)
    .subscribe(data => {
      this.session_id = data.session_id;
      this.authenticateService.storeSessionId(this.session_id);
    })
  }

  ngDoCheck() {

      if (localStorage.getItem('session_started') === 'yes' ) {
        return this.sessionBegin = true;
      }
      else{
        return this.sessionBegin = false;
      }
  }
}
