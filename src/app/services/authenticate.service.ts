import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticateService {

  domain = 'https://api.themoviedb.org/3';
  apiKey = 'api_key=cdc281a84b6d81063de227ae23cf539c';
  typeToken = '/authentication/token/new?';
  typeSessionId = '/authentication/session/new?';
  authenticateDomain = 'https://www.themoviedb.org/authenticate/';
  appDomain = window.location.hostname;
  appPort = window.location.port;
  appProtocol = window.location.protocol;

  private tokenUrl;
  private sessionUrl;

  constructor(
    private http: Http
  ) { }

  // https://api.themoviedb.org/3/authentication/token/new?api_key=<<api_key>>
  getRequestToken() {
    this.tokenUrl = this.domain + this.typeToken + this.apiKey;
    return this.http.get(this.tokenUrl)
    .map(res => res.json());
  }

  // https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved
  logIn(request_token: string) {
    let redirectTo='?redirect_to='+this.appProtocol + '//' + this.appDomain + ':' + this.appPort;
    if(localStorage.getItem('redirectToMovie')){
      redirectTo+=localStorage.getItem('redirectToMovie');
    }
    window.location.href = this.authenticateDomain + request_token + redirectTo;
  }

  // https://api.themoviedb.org/3/authentication/session/new?api_key=<<api_key>>&request_token=<<request_token>>
  getSessionId(request_token: string) {
    this.sessionUrl = this.domain + this.typeSessionId + this.apiKey + '&request_token=' + request_token;
    return this.http.get(this.sessionUrl)
    .map(res => res.json());
  }

  storeRequestToken(request_token: string) {
    localStorage.setItem('request_token', request_token);
  }

  storeSessionId(session_id: string) {
    localStorage.setItem('session_id', session_id);
    localStorage.setItem('session_started', 'yes');
  }

  isLoggedIn() {
    if (localStorage.getItem('session_started') === 'yes') {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.clear();
  }

}
