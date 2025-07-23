import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { createRxDatabase, RxCollection, RxDatabase } from 'rxdb/plugins/core';
import { getRxStorageLocalstorage } from 'rxdb/plugins/storage-localstorage';
import { Game, GameSchema } from '../modules/games.schema';
import { Team, TeamSchema } from '../modules/teams.schema';
import { Round, RoundSchema } from '../modules/rounds.schema';
import { Points, PointsSchema } from '../modules/points.schema';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type GameCollection = RxCollection<Game>;
export type RoundCollection = RxCollection<Round>;
export type TeamCollection = RxCollection<Team>;
export type PointsCollection = RxCollection<Points>;

export type MyDatabaseCollections = {
  games: GameCollection,
  rounds: RoundCollection,
  teams: TeamCollection,
  points: PointsCollection
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbPromise: Promise<RxDatabase<MyDatabaseCollections>> | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object, private http: HttpClient) {
    if (isPlatformBrowser(platformId)) {
      this.dbPromise = this.init();
    }
  }

  private async init(): Promise<RxDatabase<MyDatabaseCollections>> {
    const db = await createRxDatabase<MyDatabaseCollections>({
      name: 'localdb',
      storage: getRxStorageLocalstorage(),
    });

    await db.addCollections({
      games: { schema: GameSchema },
      rounds: { schema: RoundSchema },
      teams: { schema: TeamSchema },
      points: { schema: PointsSchema }
    });

    // Add Predefined Data
    const existingTeams = await db.teams.find().exec();
    if (existingTeams.length === 0) {
      const teamsData = await firstValueFrom(this.http.get<Team[]>('assets/teams.json'));
      await db.teams.bulkInsert(teamsData);
    }

    const existingGames = await db.games.find().exec();
    if (existingGames.length === 0) {
      const gamesData = await firstValueFrom(this.http.get<Game[]>('assets/games.json'));
      await db.games.bulkInsert(gamesData);
    }

    const existingRounds = await db.rounds.find().exec();
    if (existingRounds.length === 0) {
      const roundsData = await firstValueFrom(this.http.get<Round[]>('assets/rounds.json'));
      await db.rounds.bulkInsert(roundsData);
    }

    console.log('✅ RxDB with LocalStorage initialized.');
    return db;
  }

  public async getTeams(): Promise<TeamCollection | null> {
    if (!this.dbPromise) {
      return null;
    }
    const db = await this.dbPromise;
    return db.teams;
  }

  public async getGames(): Promise<GameCollection | null> {
    if (!this.dbPromise) {
      return null;
    }
    const db = await this.dbPromise;
    return db.games;
  }

  public async getRounds(): Promise<RoundCollection | null> {
    if (!this.dbPromise) {
      return null;
    }
    const db = await this.dbPromise;
    return db.rounds;
  }

  public async getPoints(): Promise<PointsCollection | null> {
    if (!this.dbPromise) {
      return null;
    }
    const db = await this.dbPromise;
    return db.points;
  }

  // public async observeTeams(): Promise<void> {
  //   const teams = await this.getTeams();
  //   if (!teams) return;
  //   teams.find().$.subscribe(allDocs => {
  //     console.log('🔁 Teams updated:', allDocs);
  //   });
  // }
}
