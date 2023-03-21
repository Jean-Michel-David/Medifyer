import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './page/index/index.component';
import { MonCompteComponent } from './page/mon-compte/mon-compte.component';
import { RechercheComponent } from './page/recherche/recherche.component';
import { MesRecherchesComponent } from './page/mes-recherches/mes-recherches.component';
import { PanneauAdminComponent } from './page/panneau-admin/panneau-admin.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { ConnexionComponent } from './page/connexion/connexion.component';
import { ExporterComponent } from './recherche/exporter/exporter.component';
import { FormulairesComponent } from './recherche/formulaires/formulaires.component';
import { Form1Component } from './recherche/form1/form1.component';
import { SearchFormComponent } from './admin/search-form/search-form.component';
import { AdminGetRechercheService } from './services/admin-get-recherche.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    MonCompteComponent,
    RechercheComponent,
    MesRecherchesComponent,
    PanneauAdminComponent,
    InscriptionComponent,
    ConnexionComponent,
    ExporterComponent,
    FormulairesComponent,
    Form1Component,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AdminGetRechercheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
