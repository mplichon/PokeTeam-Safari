import { Routes } from '@angular/router';
import { LoginPage } from './page/login-page/login-page';
import { GamePage } from './page/game-page/game-page';
import { TestPage } from './page/test-page/test-page';

export const routes: Routes = [
    {path: '', component: LoginPage, canActivate: [ authGuard ]},
    {path: 'login', component: LoginPage},
    {path: 'pokemon', component: PokemonPage}
    {path: 'test', component: TestPage},
    {path: 'game', component: GamePage},
];
