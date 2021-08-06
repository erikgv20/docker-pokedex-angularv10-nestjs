import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { PokedexService } from '@services/*';
import { Pokemones, Pokemon } from '@models/*';

import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  search: FormControl = new FormControl('');
  pokemones: Pokemon[] = [];
  classicMode: boolean = false;

  private offset: number;
  isLoading: boolean;
  isLastPage = false;

  searchPokemon: Pokemon = new Pokemon();
  isSearching = false;

  constructor(
      public dialog: MatDialog,
      private _PokedexService: PokedexService,
      private bottomSheet: MatBottomSheet,
      private snackBar: MatSnackBar
    ) {
    this.offset = 0 ;
  }

  ngOnInit(): void {
    this.getPage(this.offset);
  }

  getPage(offset: number) {
    if(!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this._PokedexService.dataPokemones(offset)
      .subscribe((list: Pokemones[]) => {
        if(list.length === 0) {
          this.isLastPage = true;
        }

        if(!this.isLastPage) {
          this.getPokemon(list);
        }
      });
    }
  }

  private getPokemon(list: Pokemones[]) {
    const arr: Observable<Pokemon>[] = [];
    list.map((value: Pokemones) => {
      arr.push(
        this._PokedexService.dataPokemon(value.name)
      );
    });

    forkJoin([...arr]).subscribe((pokemones: []) => {
      this.pokemones.push(...pokemones);
      this.offset +=20;
      this.isLoading = false;
    })

  }

  getPrincipalType(list: any[]) {
    return list.filter(x => x.slot === 1)[0]?.type.name;
  }

  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if(element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  }

  //onDetail(pokemon: any): void {
    // this.bottomSheet.open(PokemonDetailComponent, {
    //   data: {pokemon, classicMode: this.classicMode}
    // })
  //}

  onSearchPokemon(): void {
    this.isSearching = false;
    const value = this.search.value;
    if(value === '') {
      //this.isSearching = false;
    } else {
      //this.isSearching = true;
      this.isLoading = true;
      this._PokedexService.dataPokemon(value)
      .subscribe((pokemon: Pokemon) => {
        this.searchPokemon = pokemon;
        this.isLoading = false;
        this.isSearching = true;
      }, (error: any) => {
        this.isLoading = false;
        if(error.status === 404) {
          this.snackBar.open('Disculpe, No se encontró el Pokemon', 'Ok', {
            duration: 5000,
          });
        }
        if(error.status === 500) {
          this.snackBar.open('Disculpe, No se encontró el Pokemon', 'Ok', {
            duration: 5000,
          });
        }
      })
    }
  }

  onDetail(pokemon: Pokemon) {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '30vw',
      data: {pokemon, classicMode: this.classicMode}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    // const dialogSubmitSubscription = dialogRef.componentInstance.submitClicked.subscribe(result => {
    //   console.log(`submitClicked result:`, result);
    //   // if(result.reloadTable){
    //   //   this.getRemoteDataProductos();
    //   // }
    //   dialogSubmitSubscription.unsubscribe();
    // });

  }


}
