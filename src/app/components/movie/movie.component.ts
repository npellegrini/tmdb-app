import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CastComponent } from '../cast/cast.component';

import { MovieService } from '../../services/movie.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';


import { People } from '../../models/People';
import { Movie } from '../../models/Movie';
import { Review } from '../../models/Review';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  sendingUserWatchlist: boolean;

  id: string;
  movie: Movie;
  reviews: Review[];
  cast: People[];
  hasReviews = false;
  hasCrew = false;
  director: string;
  movieId;
  userRating;
  userHasVoted;
  volverPuntuar = false;
  isLoading = true;
  currentValue = 5;
  btnMinusClass;
  btnPlusClass;
  maxLimit;
  minLimit;
  colorWatch;
  textWatchlist;
  sendingUserRating = false;
  btnWatchlist;
  iconWatchlist;
  sessionBegin  : boolean;

  constructor(
    private movieService: MovieService,
    public authService: AuthenticateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onClickVolverPuntuar() {
    this.volverPuntuar = true;
    this.currentValue = this.userRating;
  }

  onClickRate() {
    this.sendingUserRating = true;

    this.userService.setMovieRating(this.movieId, this.currentValue)
      .subscribe(data => {
        console.log(data);
        if (data.status_code === 12 || data.status_code === 1) {
          setTimeout(() => {
            alert('Valoraste la película con un ' + this.currentValue);
            this.userRating = this.currentValue;
            this.userHasVoted = true;
            this.volverPuntuar = false;
            this.sendingUserRating = false;
          }, 1000);
        } else {
          alert('Intentalo nuevamente');
        }
      });
  }

  onClickPlus() {
    this.currentValue = this.currentValue + 0.5;
    this.btnMinusClass = '';
    this.minLimit = false;
    if (this.currentValue === 10) {
      this.btnPlusClass = 'disabled';
      this.maxLimit = true;
    }
  }

  onClickMinus() {
    this.currentValue = this.currentValue - 0.5;
    this.btnPlusClass = '';
    this.maxLimit = false;
    if (this.currentValue === 0) {
      this.btnMinusClass = 'disabled';
      this.minLimit = true;
    }
  }

  ngOnInit() {

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
    });

    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.movieService.getMovieById(id)
          .subscribe(data => {
            this.movie = data;
          }, (err: any) => {
            if (err.status === 404) {
              alert('No existe Película con ese ID');
              this.router.navigate(['/search']);
            }
          });

        this.movieService.getReviewsByMovieId(id)
          .subscribe(data => {
            if (data.total_results > 0) {
              this.hasReviews = true;
              this.reviews = data.results;
            }
          });

        this.movieService.getCastByMovieId(id)
          .subscribe(data => {
            if (data) {
              this.hasCrew = true;
              this.director = data.crew.find(p => p.job === 'Director').name;
              this.cast = data.cast;
            }
          });
      });

    localStorage.setItem('redirectToMovie','/movie/'+this.movieId);

    if (localStorage.getItem('session_started') === 'yes' ) {
      return this.sessionBegin  = true;
    }
    else{
      return this.sessionBegin  = false;
    };
  }

}
