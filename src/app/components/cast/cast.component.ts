import { Component, Input, OnInit } from '@angular/core';

import { Movie } from '../../models/Movie';
import { People } from '../../models/People';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {

  @Input() cast: People[];

  constructor() { }

  ngOnInit() {
  }

}
