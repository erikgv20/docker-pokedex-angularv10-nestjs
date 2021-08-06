import { Module, HttpModule } from '@nestjs/common';
import { PokedexService }  from './pokedex.service';
import { PokedexController } from './pokedex.controller';

@Module({
    imports:[HttpModule],
    controllers:[PokedexController],
    providers:[PokedexService]
})
export class PokedexModule {}
