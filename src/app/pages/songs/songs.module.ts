import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { MaterialUIModule } from 'src/app/shared/modules/material-ui.module';
import { RouterModule, Routes } from '@angular/router';
import { SongFormComponent } from './song-form/song-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: SongsComponent,
    data: {
      metadata: {
        title: 'Songs List',
        description: 'diplays list of songs in a table'
      }
    }
  },
  {
    path: 'song/:id',
    component: SongFormComponent,
    data: {
      metadata: {
        title: 'Song With ID',
        description: 'Form page that displays the Song Info and can Edit or Create'
      }
    }
  }
];


@NgModule({
  declarations: [
    SongsComponent,
    SongFormComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialUIModule
  ],
  exports: [RouterModule]
})

export class SongsModule { }
