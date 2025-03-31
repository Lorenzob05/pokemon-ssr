import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if(page !== 0){
      --page;
    }
    page = Math.max(0, page);

    return this.http.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`).pipe(
      map((resp) => {
        const simplePokemons:SimplePokemon[] = resp.results.map((pokemon) => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name,
        }) 
      );
      return simplePokemons;
      }),
      tap(console.log)
    )
  }

  public loadPokemon(id: string){
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    
    const errorMessage = error.error || 'An error occurred';

    return throwError(()=> new Error(errorMessage));
  }

}
