import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticateService {

  private api_key = '5a1e00313c18a1e00d243cfeb412c79d';
  private api_url_authentication='https://api.themoviedb.org/3/authentication/';
  private guest_session_url='guest_session/new?api_key=';

  constructor(private http: Http) {
  }

    isLogged() {
      if (localStorage.getItem('guestSessionId')) {
        return true;
      } else {
        return false;
      }
  }

   //https://api.themoviedb.org/3/authentication/guest_session/new?api_key=<<api_key>>
   createGuestSessionId(){
     let request=this.api_url_authentication+this.guest_session_url+this.api_key;

     return this.http.get(request)
     .map( res => res.json());
   }

   storageGuestSession(guest_session_id:string){
     localStorage.setItem('guestSessionId',guest_session_id);
   }

   logout(){
     localStorage.clear();
   }

}
