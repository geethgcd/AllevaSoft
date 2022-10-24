import { ActivatedRoute, Router } from '@angular/router';
import { Song } from 'src/app/shared/services/songs.consts';
import { SongsService } from 'src/app/shared/services/songs.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent implements OnInit, OnDestroy {
  /**
   * iscreate if false the form is opened in edit mode
   * isCreate if true the form is opened in create Mode
   */
  isCreate = true;
  isLoading = false;
  constructor(private _songService: SongsService, 
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  form: FormGroup = this.fb.group({
    id: [''],
    title: ['', [Validators.required]],
    artist: ['', [Validators.required]],
    year: ['', [Validators.required]],
  });

  get id(): AbstractControl | null {
    return this.form.get('id') || null;
  }
  get title(): AbstractControl | null {
    return this.form.get('title') || null;
  }
  get artist(): AbstractControl | null {
    return this.form.get('artist') || null;
  }
  get year(): AbstractControl | null {
    return this.form.get('year') || null;
  }
  
  destroy$ = new Subject<boolean>()
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  /**
   * Should load data into the form
   */
  ngOnInit() {
    this.isLoading = true;
    const id: string = this.route.snapshot.params['id'];
    this.isCreate = id === 'new'
    this._songService.getbyId(id).pipe(takeUntil(this.destroy$)).subscribe((song: Song ) => {
      this.isLoading = false;
      if( !song.id ) {
        this.isCreate = true;
      }
      this.form.setValue(song)
    });
    
  }
  /**
   * if form is invalid styas in same page
   * if successfully created routs to songs list page
   * @returns navigates back to /songs page
   */
  submit() {
    this.isLoading = true;
    if(this.form.errors) {
      this.form.updateValueAndValidity()
      alert('Invalid Form')
      this.isLoading = false;
      return;
    }
    if(this.isCreate){
      this._songService.create(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.isLoading = false;
        this._router.navigateByUrl('/songs')
      });
    }
    else {
      this._songService.update(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.isLoading = false;
        this._router.navigateByUrl('/songs')
      });
    }
  }
}
