import { Routes } from '@angular/router';
import { LoginPage } from './page/login-page/login-page';
import { GamePage } from './page/game-page/game-page';
import { TestPage } from './page/test-page/test-page';
import { PokemonPage } from './page/crud/pokemon-page/pokemon-page';
import { authGuard } from './guard/auth-guard';
import { RegisterPage } from './page/register-page/register-page';
import { AdminPage } from './page/crud/admin-page/admin-page';
import { MapPage } from './page/crud/map-page/map-page';

export const routes: Routes = [
    {path: '', component: LoginPage},
    
    {path: 'login', component: LoginPage},
    {path: 'register', component: RegisterPage},
    {path: 'test', component: TestPage, canActivate: [ authGuard ]},
    {path: 'game', component: GamePage, canActivate: [ authGuard ]},
    {path: 'admin', component: AdminPage},
    {path: 'map', component: MapPage}    
    {path: 'pokemon', component: PokemonPage},
];
