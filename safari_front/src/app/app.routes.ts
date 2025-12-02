import { Routes } from '@angular/router';
import { LoginPage } from './page/login-page/login-page';
import { GamePage } from './page/game-page/game-page';
import { TestPage } from './page/test-page/test-page';
import { PokemonPage } from './page/crud/pokemon-page/pokemon-page';
import { AdminPage } from './page/crud/admin-page/admin-page';

export const routes: Routes = [
    {path: '', component: LoginPage},
    {path: 'login', component: LoginPage},
    {path: 'game', component: GamePage},
    {path: 'test', component: TestPage},
    {path: 'pokemon', component: PokemonPage},
    {path: 'admin', component: AdminPage}
    
];
