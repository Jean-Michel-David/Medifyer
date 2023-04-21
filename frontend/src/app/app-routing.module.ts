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

const routes: Routes = [
  { path : 'index', component: IndexComponent},
  { path : '', component: IndexComponent},
  { path : 'recherche', component: RechercheComponent},
  { path : 'mes-recherches', component: MesRecherchesComponent},
  { path : 'admin', component: PanneauAdminComponent},
  { path : 'inscription', component: InscriptionComponent},
  { path : 'connexion', component: ConnexionComponent},
  { path : 'admin-find-user-search', component : FindSearchComponent},
  { path : 'admin-edit-infobulles', component : EditInfobullesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
