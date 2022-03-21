import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApolloAngularComponent } from './apollo-angular/apollo-angular.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpBehaviorSubjectComponent } from './http-behavior-subject/http-behavior-subject.component';
import { HttpSimpleComponent } from './http-simple/http-simple.component';
import { NativeGraphqlComponent } from './native-graphql/native-graphql.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apollo', component: ApolloAngularComponent },
  { path: 'native', component: NativeGraphqlComponent },
  { path: 'http-subject', component: HttpBehaviorSubjectComponent },
  { path: 'http-simple', component: HttpSimpleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
