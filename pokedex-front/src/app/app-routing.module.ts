import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PokedexComponent} from "./pokedex/pokedex.component";

const routes: Routes = [
    {
        path: "",
        children: [
            //{ path: '', component: HomeComponent, pathMatch: 'full'},
            { path: '', redirectTo: 'pokedex', pathMatch: 'full'},
            { path: 'pokedex', component: PokedexComponent, pathMatch: 'full' }
        ]
    },
    {
        path: "**",
        redirectTo: '/'
    },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
