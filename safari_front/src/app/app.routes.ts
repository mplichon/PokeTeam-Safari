import { Routes } from '@angular/router';
import { LoginPage } from './page/login-page/login-page';
import { GamePage } from './page/game-page/game-page';
import { TestPage } from './page/test-page/test-page';

export const routes: Routes = [
    {path: '', component: LoginPage},
    {path: 'login', component: LoginPage},
    {path: 'game', component: GamePage},
    {path: 'test', component: TestPage},
];
