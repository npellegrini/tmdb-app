import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, Headers, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  domain = 'https://api.themoviedb.org/3';
  apiKey = 'api_key=cdc281a84b6d81063de227ae23cf539c';
  sessionId = '&session_id=' + localStorage.getItem('session_id');

  constructor(
    private http: Http
  ) { }

  setMovieRating(movieId: number, value: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const data = {
      'value': value
    };

    const requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: 'https://api.themoviedb.org/3/movie/' + movieId.toString() + '/rating?' + this.apiKey + this.sessionId,
      headers: headers,
      body: JSON.stringify(data)
    });

    return this.http.request(new Request(requestOptions))
      .map(res => res.json());
  }

}
