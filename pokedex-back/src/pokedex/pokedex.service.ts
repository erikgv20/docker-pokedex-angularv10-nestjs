import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Pokemon } from './models/Pokemon.model';
import { Pokemones } from './models/Pokemones.model';

@Injectable()
export class PokedexService {

    private baseUrlPokeapi = 'https://pokeapi.co/api/v2/';

    constructor(private httpService: HttpService){}

    getPokemones(offset: number, limit: number = 20): Observable<AxiosResponse<Pokemones>>{
        return this.httpService.get(this.baseUrlPokeapi + 'pokemon?offset=' + offset + '&limit=' + limit);
    }

    getPokemon(pokemon: number | string): Observable<AxiosResponse<Pokemon>>{
        return this.httpService.get(this.baseUrlPokeapi + 'pokemon/' + pokemon);
    }

}
