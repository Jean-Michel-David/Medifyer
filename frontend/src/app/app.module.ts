import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ListeRecherchesComponent } from './recherche/liste-recherches/liste-recherches.component';
import { SauvegarderComponent } from './recherche/sauvegarder/sauvegarder.component';
import { Form2Component } from './recherche/form2/form2.component';
import { Form3Component } from './recherche/form3/form3.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimateModule } from 'primeng/animate';
import { DragDropModule } from 'primeng/dragdrop';
import { RippleModule  } from 'primeng/ripple';

import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { FindSearchComponent } from './admin/find-search/find-search.component';
import { EditInfobullesComponent } from './admin/edit-infobulles/edit-infobulles.component';
import { ModalComponent } from './recherche/modal/modal.component';

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
    Form2Component,
    Form3Component,
    FindSearchComponent,
    EditInfobullesComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    AnimateModule,
    DragDropModule,
    RippleModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AuthHeaderInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
