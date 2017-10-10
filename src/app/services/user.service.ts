import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, Headers, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

import { Movie } from '../models/Movie';

@Injectable()
export class UserService {

  domain = 'https://api.themoviedb.org/3';
  typeAccount = '/account?';
  typeVotedMovies = '/account/{account_id}/rated/movies?';
  typeWatchlistMovies = '/account/{account_id}/watchlist/movies?';
  typeVotedTvShows = '/account/{account_id}/rated/tv?';
  typeWatchlistTvShows = '/account/{account_id}/watchlist/tv?';
  apiKey = 'api_key=a1f9c26ac26edcec7f8c8237a061f2d7';
  sessionId = '&session_id=' + localStorage.getItem('session_id');

  private userProfileUrl;
  private userVotedMovies;
  private userWatchlistMovies;
  private userVotedTvShows;
  private userWatchlistTvShows;

  constructor(
    private http: Http
  ) { }

  // https://api.themoviedb.org/3/account?api_key=a1f9c26ac26edcec7f8c8237a061f2d7&session_id=236e2638014121426070b1e304ab4b25c4a6a793
  getUserProfile() {
    this.userProfileUrl = this.domain + this.typeAccount + this.apiKey + this.sessionId;
    return this.http.get(this.userProfileUrl)
      .map(res => res.json());
  }

  // Movies

  // tslint:disable-next-line:max-line-length
  // https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=<<>>&language=es-ES&session_id=<<>>&sort_by=created_at.asc&page=1
  getUserVotedMovies() {
    // tslint:disable-next-line:max-line-length
    this.userVotedMovies = this.domain + this.typeVotedMovies + this.apiKey + '&language=es-ES' + this.sessionId + '&sort_by=created_at.asc&page=1';
    return this.http.get(this.userVotedMovies)
      .map(res => res.json());
  }

  // tslint:disable-next-line:max-line-length
  // https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=<<>>&language=es-ES&session_id=<<>>&sort_by=created_at.asc&page=1
  getUserWatchlistMovies() {
    // tslint:disable-next-line:max-line-length
    this.userWatchlistMovies = this.domain + this.typeWatchlistMovies + this.apiKey + '&language=es-ES' + this.sessionId + '&sort_by=created_at.asc&page=1';
    // console.log(this.sessionId);
    return this.http.get(this.userWatchlistMovies)
      .map(res => res.json());
  }

  // https://api.themoviedb.org/3/movie/movieid/rating?api_key=<<>>&session_id=<<>>
  setMovieRating(movieId: number, value: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // no hace falta el .toString()
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

  // https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=<<>>&session_id=<<>>
  setMovieWatchlist(movieId: number, watchlist: boolean) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // no hace falta el .toString()
    const data = {
      'media_type': 'movie',
      'media_id': movieId,
      'watchlist': !watchlist
    };

    const requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: 'https://api.themoviedb.org/3/account/{account_id}/watchlist?' + this.apiKey + this.sessionId,
      headers: headers,
      body: JSON.stringify(data)
    });

    return this.http.request(new Request(requestOptions))
      .map(res => res.json());
  }

  // TV Shows

  // tslint:disable-next-line:max-line-length
  // https://api.themoviedb.org/3/account/{account_id}/rated/tv?api_key=<<>>&language=es-ES&session_id=<<>>&sort_by=created_at.asc&page=1
  getUserVotedTvShows() {
    // tslint:disable-next-line:max-line-length
    this.userVotedTvShows = this.domain + this.typeVotedTvShows + this.apiKey + '&language=es-ES' + this.sessionId + '&sort_by=created_at.asc&page=1';
    return this.http.get(this.userVotedTvShows)
      .map(res => res.json());
  }

  // tslint:disable-next-line:max-line-length
  // https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=<<>>&language=es-ES&session_id=<<>>&sort_by=created_at.asc&page=1
  getUserWatchlistTvShows() {
    // tslint:disable-next-line:max-line-length
    this.userWatchlistTvShows = this.domain + this.typeWatchlistTvShows + this.apiKey + '&language=es-ES' + this.sessionId + '&sort_by=created_at.asc&page=1';
    // console.log(this.sessionId);
    return this.http.get(this.userWatchlistTvShows)
      .map(res => res.json());
  }

  // https://api.themoviedb.org/3/tv/{tv_id}/rating?api_key=<<>>&session_id=<<>>
  setTvShowRating(tvShowId: number, value: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // no hace falta el .toString()
    const data = {
      'value': value
    };

    const requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: 'https://api.themoviedb.org/3/tv/' + tvShowId.toString() + '/rating?' + this.apiKey + this.sessionId,
      headers: headers,
      body: JSON.stringify(data)
    });

    return this.http.request(new Request(requestOptions))
      .map(res => res.json());
  }

  // https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=<<>>&session_id=<<>>
  setTvShowWatchlist(tvShowId: number, watchlist: boolean) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // no hace falta el .toString()
    const data = {
      'media_type': 'tv',
      'media_id': tvShowId,
      'watchlist': !watchlist
    };

    const requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: 'https://api.themoviedb.org/3/account/{account_id}/watchlist?' + this.apiKey + this.sessionId,
      headers: headers,
      body: JSON.stringify(data)
    });

    return this.http.request(new Request(requestOptions))
      .map(res => res.json());
  }

}
