import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NewsData } from "../../model/news.model";
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {

  news: NewsData[] = [];
  private newsSub: Subscription;

  constructor(
    public newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newsSub = this.newsService.getNewsUpdateListener()
    .subscribe( (news: NewsData[]) => {
      this.news = news;
    });
    if(this.router.url=="/archived"){
      this.newsService.getNews(true);
    } else {
      this.newsService.getNews();
    }
  }

  onArchive(newsID: string) {
    this.newsService.archiveNews(newsID).subscribe(
        (result)=>{this.news = this.news.filter(news => news._id !== newsID);},
        (err) => { console.log('Popup Error'); }
      );
  }

  onDelete(newsID: string) {
    this.newsService.deleteNews(newsID).subscribe(
        (result)=>{ this.news = this.news.filter(news => news._id !== newsID);},
        (err) => { console.log('Popup Error'); }
      );
  }



}