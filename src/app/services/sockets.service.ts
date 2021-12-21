import { Injectable } from "@angular/core";
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class WSService {

    constructor( private socket: Socket) {
        this.checkStatus();
    }

    checkStatus(){
        this.socket.on('connect', () => {
            console.log("Connected to the server");
        });
    }

    listen(evento:string){
        return this.socket.fromEvent(evento);
    }
}