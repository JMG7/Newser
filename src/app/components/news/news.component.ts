import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
  }

}