import { Routes } from '@angular/router';
import { ChainReactionComponent } from './chain-reaction/chain-reaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
    { path: 'chain-reaction', component: ChainReactionComponent, pathMatch: 'full' },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
