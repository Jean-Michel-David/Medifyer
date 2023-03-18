import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './page/index/index.component';
import { MonCompteComponent } from './page/mon-compte/mon-compte.component';
import { NouvelleRechercheComponent } from './page/nouvelle-recherche/nouvelle-recherche.component';
import { MesRecherchesComponent } from './page/mes-recherches/mes-recherches.component';
import { PanneauAdminComponent } from './page/panneau-admin/panneau-admin.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { ConnexionComponent } from './page/connexion/connexion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    MonCompteComponent,
    NouvelleRechercheComponent,
    MesRecherchesComponent,
    PanneauAdminComponent,
    InscriptionComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
