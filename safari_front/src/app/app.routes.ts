import { Routes } from '@angular/router';
import { LoginPage } from './page/login-page/login-page';
import { GamePage } from './page/game-page/game-page';
import { TestPage } from './page/test-page/test-page';
import { PokemonPage } from './page/crud/pokemon-page/pokemon-page';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    {path: '', component: LoginPage, canActivate: [ authGuard ]},
    {path: 'login', component: LoginPage},
    {path: 'pokemon', component: PokemonPage},
    {path: 'test', component: TestPage, canActivate: [ authGuard ]},
    {path: 'game', component: GamePage, canActivate: [ authGuard ]},
];
