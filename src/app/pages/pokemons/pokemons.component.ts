import { ChangeDetectionStrategy, Component, inject, OnInit, signal, SimpleChange } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import {toSignal} from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent implements OnInit {
  public isLoading = signal(true)

  private title = inject(Title)

  private pokemonService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])

  private route = inject(ActivatedRoute)

  private router = inject(Router)

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params => Number(params.get('page')) || 1)
    )
  )

  ngOnInit(): void {
    this.loadPokemons()
    // setTimeout(() => {
    //   this.isLoading.set(false)
    // }, 1500);
  }

  public loadPokemons(page = 0){

    const pageLoad = this.currentPage()! + page

    this.pokemonService.loadPage(pageLoad)
    .pipe(
      tap(() => this.router.navigate([], {queryParams: {page: pageLoad}})),
      tap(() => this.title.setTitle(`Pokemon SSR - Page ${pageLoad}`))
    )
    .subscribe((pokemons) =>{
      this.pokemons.set(pokemons)
    })
  }
}