import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public games: any;

  constructor(
    public router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.commonService.getGames().subscribe(
      data => {
        this.games = data;
      },
      err => {
        console.log('Games not configured')
      }
    );
  }



}
