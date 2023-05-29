import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { RechercheComponent } from './page/recherche/recherche.component';
import { MesRecherchesComponent } from './page/mes-recherches/mes-recherches.component';
import { PanneauAdminComponent } from './page/panneau-admin/panneau-admin.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { ConnexionComponent } from './page/connexion/connexion.component';
import { FindSearchComponent } from './admin/find-search/find-search.component';
import { EditInfobullesComponent } from './admin/edit-infobulles/edit-infobulles.component';
import { ManageAdminsComponent } from './admin/manage-admins/manage-admins.component';
import { EditInfosComponent } from './admin/edit-infos/edit-infos.component';
import { MonCompteComponent } from './page/mon-compte/mon-compte.component';
import { VerifEmailComponent } from './page/verif-email/verif-email.component';
import { FormEmailComponent } from './page/recup-password/form-email/form-email.component';
import { NewPasswordComponent } from './page/recup-password/new-password/new-password.component';
import { PasswordCodeComponent } from './page/recup-password/password-code/password-code.component';

const routes: Routes = [
  { path : 'index', component: IndexComponent},
  { path : '', component: IndexComponent},
  { path : 'recherche', component: RechercheComponent},
  { path : 'mes-recherches', component: MesRecherchesComponent},
  { path : 'admin', component: PanneauAdminComponent},
  { path : 'inscription', component: InscriptionComponent},
  { path : 'connexion', component: ConnexionComponent},
  { path : 'admin/find-user-search', component : FindSearchComponent},
  { path : 'admin/edit-infobulles', component : EditInfobullesComponent},
  { path : 'admin/manage-admins', component : ManageAdminsComponent },
  { path : 'admin/edit-infos', component : EditInfosComponent },
  {path : 'mon-compte', component : MonCompteComponent},
  {path : 'verif-email', component : VerifEmailComponent},
  {path : 'form-email', component : FormEmailComponent},
  {path : 'new-password', component : NewPasswordComponent},
  {path : 'password', component : PasswordCodeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
