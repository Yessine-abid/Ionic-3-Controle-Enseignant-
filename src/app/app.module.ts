 
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { MyApp } from './app.component';
import { MatierePage } from '../pages/matiere/matiere';
import { LoginPage } from '../pages/login/login';
import { SallesPage } from '../pages/salles/salles';
import { SeancePage } from '../pages/seance/seance';
import { DepPage } from '../pages/dep/dep';
import { JourPage } from '../pages/jour/jour';
import { EnseignantPage } from '../pages/enseignant/enseignant';
import { NiveauxPage } from '../pages/niveaux/niveaux';
import { EnseignementPage } from '../pages/enseignement/enseignement';
import { AddEnseignementsPage } from '../pages/add-enseignements/add-enseignements';
import { DashboardPage } from '../pages/dashboard/dashboard';



import { MatiereService } from "../services/matiere.service";
import { SallesService } from "../services/salles.service";
import { RegistersService } from "../services/register.service";
import { DepService } from "../services/dep.service";
import { EnseignantService } from "../services/enseignant.service";
import { JourService } from "../services/jour.service";
import { SeanceService } from "../services/seance.service";
import { NiveauxService } from "../services/niveaux.service";
import { EnseignementService } from "../services/enseignement.service";
import { UrlbaseService } from "../services/urlbase.service"; 


import { AnimationService, AnimatesDirective } from 'css-animator';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    MatierePage,
    AnimatesDirective,
    SallesPage,
    LoginPage,
    DepPage,
    EnseignantPage,
    JourPage,
    NiveauxPage,
    SeancePage,
    EnseignementPage,
    AddEnseignementsPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MatierePage,
    LoginPage,
    SallesPage,
    DepPage,
    JourPage,
    EnseignantPage,
    NiveauxPage,
    SeancePage,
    EnseignementPage,
    AddEnseignementsPage,
    DashboardPage
  ],
  providers:
    [
    StatusBar,
    SplashScreen,
    MatiereService,
      SallesService,
      RegistersService,
      SeanceService,
      NiveauxService,
      DepService,
      JourService,
      EnseignantService,
      EnseignementService,
      UrlbaseService, 
    AnimationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
