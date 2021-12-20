import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { NewsData } from "../model/news.model"

const BACKEND_URL = environment.apiUrl + "/news";
const ARCHIVED_PARAM = "?archived=true"

@Injectable({ providedIn: "root" })
export class NewsService {
    news:NewsData[]  = [];
    newsListener = new Subject<NewsData[]>();
    
    constructor(private http: HttpClient) {}

    getNews(archived?: boolean){
        let URL: string = '';
        if(archived){
            URL = BACKEND_URL + ARCHIVED_PARAM
        } else {
            URL = BACKEND_URL
        }
        this.http
            .get<{message: string; news: NewsData[]}>(URL)
                .subscribe( results => {
                    this.news = results.news
                    this.newsListener.next([...this.news]);
                })
    }

    getArchivedNews(){
        this.http
            .get<{message: string; news: NewsData[]}>(BACKEND_URL + ARCHIVED_PARAM)
                .subscribe( results => {
                    this.news = results.news
                    this.newsListener.next({...this.news});
                })
    }

    getNewsUpdateListener() {
        return this.newsListener.asObservable();
    }

    archiveNews(newsID: string) {
        return this.http.put(BACKEND_URL + '/' + newsID, null);
    }

    deleteNews(newsID: string) {
        return this.http.delete(BACKEND_URL + '/' + newsID);
    }
}