import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { NouvelleRechercheComponent } from './page/nouvelle-recherche/nouvelle-recherche.component';
import { MesRecherchesComponent } from './page/mes-recherches/mes-recherches.component';
import { PanneauAdminComponent } from './page/panneau-admin/panneau-admin.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { ConnexionComponent } from './page/connexion/connexion.component';

const routes: Routes = [
  { path : 'index', component: IndexComponent},
  { path : '', component: IndexComponent},
  { path : 'recherche', component: NouvelleRechercheComponent},
  { path : 'mes-recherches', component: MesRecherchesComponent},
  { path : 'admin', component: PanneauAdminComponent},
  { path : 'inscription', component: InscriptionComponent},
  { path : 'connexion', component: ConnexionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
