import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApolloAngularComponent } from './apollo-angular/apollo-angular.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apollo', component: ApolloAngularComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
