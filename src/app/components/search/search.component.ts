import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/Movie'
import{ MovieService } from '../../services/movie.service'
import { RouterModule }   from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchString : String;
  movies: Movie[];

  constructor(private movieService:MovieService){
  }

  searchMovie(){
    this.movieService.searchMovie(this.searchString)
    .subscribe(dat =>this.movies=dat.results);
  }
  ngOnInit() {
  }

}
