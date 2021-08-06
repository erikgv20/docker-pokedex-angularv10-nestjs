import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Pokemones, Pokemon } from '@models/*';

@Injectable()
export class PokedexService {

  pokemon: any;
  pokemones: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  dataPokemones(offset: number, limit: number = 20) : Observable<Pokemones[]> {
    return this.http.get<Pokemones[]>(`api/pokedex/${offset}/${limit}`)
    .pipe(
        map((x: any) => x.results)
    );
  }

  dataPokemon(pokemon: number | string): Observable<Pokemon> {
    if (typeof pokemon === 'string'){
      pokemon = pokemon.toLowerCase();
    }
    return this.http.get<Pokemon>(`api/pokedex/${pokemon}`);
  }


}