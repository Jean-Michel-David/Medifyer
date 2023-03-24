import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule,FormGroup } from '@angular/forms';

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
import { UserListComponent } from './admin/user-list/user-list.component';
import { ListeRecherchesComponent } from './recherche/liste-recherches/liste-recherches.component';
import { SauvegarderComponent } from './recherche/sauvegarder/sauvegarder.component';


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
    SearchFormComponent,
    UserListComponent,
    ListeRecherchesComponent,
    SauvegarderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AdminGetRechercheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
