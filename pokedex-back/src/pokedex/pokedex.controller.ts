import { Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pokemon } from './interfaces/Pokemon';
import { PokedexService  } from './pokedex.service';

@Controller('pokedex')
export class PokedexController {

    constructor(private _PokedexService: PokedexService){}

    // CONSULTA USANDO DECORADOR @Query
    // @Get()
    // async getPokemones(@Query('offset') offset:number, @Query('limit') limit:number){
    //     const res = await (await this._PokedexService.getPokemones(offset, limit).toPromise());
    //     return res.data;
    // }

    // CONSULTA USANDO DECORADOR @Param
    @Get(':offset/:limit')
    async getPokemones(@Param('offset') offset:number, @Param('limit') limit:number){
        const res = await (await this._PokedexService.getPokemones(offset, limit).toPromise());
        return res.data;
    }

    @Get(':id')
    async getPokemonesById(@Param('id') id){
        console.log("El id del pokemon es->", id);
        const res = await (await this._PokedexService.getPokemon(id).toPromise());
        return res.data;
    }

    @Post()
    postPokemon(){
        return "Método post para crear un Pokemon";
    }

    @Put()
    putPokemon(){
        return "Método Update para actualizar un pokemon";
    }

    @Delete()
    deletePokemon(){
        return "Método Delete para eliminar un pokemon";
    }
}
