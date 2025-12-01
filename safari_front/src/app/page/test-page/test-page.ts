import { Component } from '@angular/core';
import { PokemonsCaptures } from '../../component/pokemons-captures/pokemons-captures';

@Component({
  selector: 'app-test-page',
  imports: [PokemonsCaptures],
  templateUrl: './test-page.html',
  styleUrl: './test-page.css',
})
export class TestPage {

}
