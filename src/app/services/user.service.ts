import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, Headers, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

import { Movie } from '../models/Movie';

@Injectable()
export class UserService {

  typeAccount = '/account?';
  typeVotedMovies = '/account/{account_id}/rated/movies?';
  typeWatchlistMovies = '/account/{account_id}/watchlist/movies?';
  typeVotedTvShows = '/account/{account_id}/rated/tv?';

  movieRateUrl = 'https://api.themoviedb.org/3/movie/';
  apiKey ='/rating?api_key=5a1e00313c18a1e00d243cfeb412c79d'
  guestSessionId='&session_id=' + localStorage.getItem('guestSessionId');

  //https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=<<api_key>>

  private userProfileUrl;
  private userVotedMovies;
  private userWatchlistMovies;
  private userVotedTvShows;
  private userWatchlistTvShows;

  constructor(
    private http: Http
  ) { }

  // https://api.themoviedb.org/3/movie/movieid/rating?api_key=<<>>&session_id=<<>>
  setMovieRating(movieId: number, value: number) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const data = {
      'value': value
    };

    const requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.movieRateUrl+movieId+this.apiKey+this.guestSessionId,
       headers: headers,
       body: JSON.stringify(data)
    });

    return this.http.request(new Request(requestOptions))
      .map(res => res.json());
  }

//   setRateMovie(movieId: string, MovieValue: number) {
//
//       const params = this.getParams({
//           value : MovieValue
//       });
//
//       this.getGuestSessionId()
//       .then(id => this.handleMovieRate(id, movieId, MovieValue))
//       .catch(this.handleError);
//   }
//
//   handleMovieRate(guestSessionID:string, movieId: string, rateValue:number) : void{
//
//       const url = 'movie/' + movieId + '/rating?api_key=' + this.apiKey + '&guest_session_id=' + guestSessionID;
//       const params = this.getParams({
//           value : rateValue
//       });
//       this.http.post(this.getApiUrl(url), params)
//                   .toPromise()
//                   .then(response => response.json())
//                   .catch(this.handleError);
//   }
//
//   handleError (error:Response): void {
//       console.log(error);
// }
}
