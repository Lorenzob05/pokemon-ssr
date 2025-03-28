import { ChangeDetectionStrategy, Component, inject, OnInit, signal, SimpleChange } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent implements OnInit {
  // public isLoading = signal(true)

  private pokemonService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])

  ngOnInit(): void {
    this.loadPokemons()
    // setTimeout(() => {
    //   this.isLoading.set(false)
    // }, 1500);
  }

  public loadPokemons(page = 0){
    this.pokemonService.loadPage(page).subscribe((pokemons) =>{
      this.pokemons.set(pokemons)
    })
  }
}