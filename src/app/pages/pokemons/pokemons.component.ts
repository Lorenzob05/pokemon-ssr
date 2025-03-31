import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal, SimpleChange } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import {toSignal} from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent,RouterLink],
  templateUrl: './pokemons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent{
  public isLoading = signal(true)

  private title = inject(Title)

  private pokemonService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])

  private route = inject(ActivatedRoute)

  private router = inject(Router)

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page']?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChange = effect(() => {
    this.loadPokemons(this.currentPage())
  }, {allowSignalWrites: true})

  // ngOnInit(): void {
  //   this.loadPokemons()
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false)
  //   // }, 1500);
  //   console.log(this.currentPage())
  // }

  public loadPokemons(page = 0){

    this.pokemonService.loadPage(page)
    .pipe(
      // tap(() => this.router.navigate([], {queryParams: {page: pageLoad}})),
      tap(() => this.title.setTitle(`Pokemon SSR - Page ${page}`))
    )
    .subscribe((pokemons) =>{
      this.pokemons.set(pokemons)
    })
  }
}