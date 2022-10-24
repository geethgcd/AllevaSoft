import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  {
    path: 'songs',
    loadChildren: () => import('./pages/songs/songs.module').then(m => m.SongsModule),
    data: {
      metadata: {
        title: 'Root Page',
        description: 'This page loads list of songs'
      }
    }
  },
  { 
    path: 'home', component: HomeComponent,
    data: {
      metadata: {
        title: 'Dummy Home Page',
        description: 'It just displays the exercised description'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
