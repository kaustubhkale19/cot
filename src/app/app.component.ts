import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Clash Of Titans';
  showGames = true;

  constructor(
    public router: Router
  ) { }

  public play() {
    this.showGames = true;
    this.router.navigate(['dashboard'])
  }
}
