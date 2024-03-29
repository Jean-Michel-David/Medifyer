import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './page/index/index.component';
import { MonCompteComponent } from './page/mon-compte/mon-compte.component';
import { RechercheComponent } from './page/recherche/recherche.component';
import { MesRecherchesComponent } from './page/mes-recherches/mes-recherches.component';
import { PanneauAdminComponent } from './page/panneau-admin/panneau-admin.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { ConnexionComponent } from './page/connexion/connexion.component';
import { FormulairesComponent } from './recherche/formulaires/formulaires.component';
import { Form1Component } from './recherche/form1/form1.component';
import { SearchFormComponent } from './admin/search-form/search-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ListeRecherchesComponent } from './recherche/liste-recherches/liste-recherches.component';
import { Form2Component } from './recherche/form2/form2.component';
import { Form3Component } from './recherche/form3/form3.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimateModule } from 'primeng/animate';
import { DragDropModule } from 'primeng/dragdrop';
import { RippleModule  } from 'primeng/ripple';
import { ClipboardModule } from 'ngx-clipboard';
import { SidebarModule } from 'primeng/sidebar';
import { SelectButtonModule } from 'primeng/selectbutton';


import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { FindSearchComponent } from './admin/find-search/find-search.component';
import { EditInfobullesComponent } from './admin/edit-infobulles/edit-infobulles.component';
import { ManageAdminsComponent } from './admin/manage-admins/manage-admins.component';
import { EquationDisplayComponent } from './recherche/equation-display/equation-display.component';
import { FooterComponent } from './footer/footer.component';
import { EditInfosComponent } from './admin/edit-infos/edit-infos.component';
import { VerifEmailComponent } from './page/verif-email/verif-email.component';
import { FormEmailComponent } from './page/recup-password/form-email/form-email.component';
import { NewPasswordComponent } from './page/recup-password/new-password/new-password.component';
import { PasswordCodeComponent } from './page/recup-password/password-code/password-code.component';

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
    FormulairesComponent,
    Form1Component,
    SearchFormComponent,
    UserListComponent,
    ListeRecherchesComponent,
    Form2Component,
    Form3Component,
    FindSearchComponent,
    EditInfobullesComponent,
    ManageAdminsComponent,
    EquationDisplayComponent,
    FooterComponent,
    EditInfosComponent,
    VerifEmailComponent,
    FormEmailComponent,
    NewPasswordComponent,
    PasswordCodeComponent,

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
    RippleModule,
    ClipboardModule,
    SidebarModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    MessagesModule,
    SelectButtonModule,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AuthHeaderInterceptor, multi : true},
    [MessageService],
    [ConfirmationService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
