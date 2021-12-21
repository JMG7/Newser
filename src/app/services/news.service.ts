import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Subscription } from "rxjs";

import { environment } from "../../environments/environment";
import { NewsData } from "../model/news.model"
import { WSService } from '../services/sockets.service';

const BACKEND_URL = environment.API_URL + "/news";
const ARCHIVED_PARAM = "?archived=true"

@Injectable({ providedIn: "root" })
export class NewsService {
    openAccordion: boolean[] = []
    news:NewsData[]  = [];
    newsListener = new Subject<NewsData[]>();
    wsAddedNewsListener: Subscription;
    
    constructor(
        private http: HttpClient,
        private wsService: WSService
    ) {
        this.wsAddedNewsListener = this.wsNews().subscribe(
            (news: any) => {
                this.getOneNews(news.id);
            }
        );
    }

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
                });
    }

    getOneNews(id: string){
        let URL: string = BACKEND_URL + '/one/' + id
        this.http
            .get<{message: string; news: NewsData}>(URL)
                .subscribe( results => {
                    const resNews:NewsData = {
                        _id: results.news._id,
                        title: results.news.title,
                        description: results.news.description,
                        content: results.news.content,
                        author: results.news.author,
                        date: results.news.date,
                    }
                    this.news.unshift(resNews);
                    this.newsListener.next([...this.news]);
                });
    }

    getArchivedNews(){
        this.http
            .get<{message: string; news: NewsData[]}>(BACKEND_URL + ARCHIVED_PARAM)
                .subscribe( results => {
                    this.news = results.news
                    this.newsListener.next([...this.news]);
                });
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

    //SOCKET
    wsNews() {
        return this.wsService.listen("NewsAdded");
    }

}