import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { userData } from "../model/user.model"

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({ providedIn: "root" })
export class UserService {
    isAuthenticated = false;
    id: string = "";
    token: string = "";
    userStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient) {}

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserID() {
        return this.id;
    }

    getToken() {
        return this.token;
    }

    getUserStatusListener() {
        return this.userStatusListener.asObservable();
    }
    
    login(userName: string, password: string) {
        const authData: userData = { userName: userName, password: password };
        this.http
            .post<{ id: string; token: string; expiresAt: number }>(
                BACKEND_URL + "/login",
                authData
            )
            .subscribe( response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    this.isAuthenticated = true;
                    this.id = response.id;
                    this.userStatusListener.next(true);
                }
            },
            error => {
              this.userStatusListener.next(false);
            }
          );
      }

      logout() {
        this.isAuthenticated = false;
        this.id = "";
        this.token = "";
        this.userStatusListener.next(false);
      }

}