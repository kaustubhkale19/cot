import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/services/common.service';
import { DatabaseService } from '../shared/services/database.service';
import { Game } from '../shared/modules/games.schema';
import { Team } from '../shared/modules/teams.schema';
import { Round } from '../shared/modules/rounds.schema';
import { Points } from '../shared/modules/points.schema';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public games: Game[] = [];
  public teams: Team[] = [];
  public rounds: Round[] = [];
  public points: Points[] = [];

  constructor(
    public router: Router,
    private commonService: CommonService,
    private dbService: DatabaseService
  ) { }

  async ngOnInit() {
    // this.dbService.observeTeams();

    const teamsCollection = await this.dbService.getTeams();
    if (teamsCollection) {
      this.teams = await teamsCollection.find().exec();
      // Optionally subscribe to realtime changes:
      // teamsCollection.find().$.subscribe(docs => {
      //   this.teams = docs;
      // });
    }

    const gamesCollection = await this.dbService.getGames();
    if (gamesCollection) {
      this.games = await gamesCollection.find().exec();
    }

    const roundsCollection = await this.dbService.getRounds();
    if (roundsCollection) {
      this.rounds = await roundsCollection.find().exec();
    }


    // this.commonService.getGames().subscribe(
    //   data => {
    //     this.games = data;
    //   },
    //   err => {
    //     console.log('Games not configured')
    //   }
    // );

    // this.commonService.getTeams().subscribe(
    //   data => {
    //     this.teams = data;
    //   },
    //   err => {
    //     console.log('Teams not configured')
    //   }
    // );
  }

  public playGame(teamId: string, roundId: string) {
    console.log(teamId, roundId)
  }

}
