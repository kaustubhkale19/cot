import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Game {
  name: string;
  description: string;
  rules: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  getGames() {
    return this.http.get<Game[]>('./assets/games.json');
  }
}
