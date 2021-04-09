import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JogoComponent } from './jogo/jogo.component';
import { RankComponent } from './rank/rank.component';

export const appRouters: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'home/:resultadoChutes', component: HomeComponent },
  { path: 'jogo', component: JogoComponent },
  { path: 'jogo/:nome', component: JogoComponent },
  { path: 'rank', component: RankComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JogoComponent,
    RankComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
