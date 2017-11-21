import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { RouterModule }   from '@angular/router';
import { CastComponent } from '../cast/cast.component';

import { MovieService } from '../../services/movie.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';


import { People } from '../../models/People';
import { Movie } from '../../models/Movie';
import { Gender } from '../../models/Gender';
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
  genders: Gender[];
  reviews: Review[];
  cast: People[];
  hasReviews = false;
  hasCrew = false;
  director: string;
  movieId;
  userRating;
  userHasVoted;
  userWatchlist;
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
  sesionIniciada : boolean;

  constructor(
    private movieService: MovieService,
    public authService: AuthenticateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  logInFromMovie() {
    localStorage.setItem('redirectToMovie', '/movie/' + this.movieId);
    this.router.navigate(['/identify']);
  }

  onClickVolverPuntuar() {
    this.volverPuntuar = true;
    this.currentValue = this.userRating;
  }

  onClickRate() {
    this.sendingUserRating = true;

    this.userService.setMovieRating(this.movieId, this.currentValue)
      .subscribe(data => {
        // console.log(data);
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

  onClickWatchlist() {
    // console.log(this.currentValue);
    this.sendingUserWatchlist = true;

    this.userService.setMovieWatchlist(this.movieId, this.userWatchlist)
      .subscribe(data => {
        if (data.status_code === 12 || data.status_code === 1) {
          setTimeout(() => {
            alert('Agregaste la Película a tu Watchlist');
            this.sendingUserWatchlist = false;
            this.textWatchlist = 'Quitar de Watchlist';
            this.iconWatchlist = 'fa fa-eye-slash';
            this.btnWatchlist = 'btn btn-danger';
            this.userWatchlist = true;
          }, 1000);
        } else if (data.status_code === 13) {
          setTimeout(() => {
            alert('Quitaste la Película a tu Watchlist');
            this.userWatchlist = false;
            this.textWatchlist = 'Agregar a Watchlist';
            this.iconWatchlist = 'fa fa-eye';
            this.btnWatchlist = 'btn btn-success';
            this.sendingUserWatchlist = false;
          }, 1000);
        } else {
          alert('Algo salió mal, vuelve a intentar');
        }
      });
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
            this.genders = this.movie.genders;
            // console.log(this.movie);
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
            console.log(this.reviews);
            }
          });

        this.movieService.getCastByMovieId(id)
          .subscribe(data => {
            if (data) {
              this.hasCrew = true;
              // console.log(data);
              this.director = data.crew.find(p => p.job === 'Director').name;
              this.cast = data.cast;

            }
          });
      });

    localStorage.removeItem('redirectToMovie');

    if (localStorage.getItem('session_started') === 'yes' ) {
      return this.sesionIniciada = true;
    }
    else{
      return this.sesionIniciada = false;
    };
  }

}
