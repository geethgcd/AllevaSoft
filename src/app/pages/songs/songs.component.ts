import { Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Song, Songs } from 'src/app/shared/services/songs.consts';
import { SongsService } from 'src/app/shared/services/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnDestroy, OnInit, OnChanges {
  isLoading = false;
  /**
   * MatSort to Table
   */
  sort: any;
  @ViewChild(MatSort, {static: false}) set sortContent(content: ElementRef) {
      this.sort = content;
      if (this.sort){
         this.songs.sort = this.sort;
      }
  }
  /**
   * MatPagination to Table
   */
  paginator: any;
  @ViewChild(MatPaginator, {static: false}) set paginationContent(content: ElementRef) {
      this.paginator = content;
      if (this.paginator){
         this.songs.paginator = this.paginator;
      }
  }

  displayedColumns: string[] = [
    'title',
    'artist',
    'year',
    'action',
  ];
  constructor(private songService: SongsService) {
  }

  public songs: any;
  private destroy$ = new Subject();
  /**
 * Get all songs when Loaded 
 */
  ngOnInit() {
    this.getSongList();
  }
  /**
 * Get all songs everytime component triggers changes
 */
  ngOnChanges() {
    this.getSongList();
  }
  ngOnDestroy() {
      this.destroy$.next(true)
      this.destroy$.complete()
  }

  /**
   * 
   * @param id song ID
   * To trigger the delete song by id
   */
  removeSong(id: string)  {
    this.isLoading = true;
    this.songService.delete(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isLoading = false
      this.getSongList()
    })
  };
/**
 * get list of songs to show in tables
 */
  getSongList = () => {
    this.isLoading = true;
    this.songService.get().pipe(takeUntil(this.destroy$)).subscribe((response: Songs) => {
      this.songs = new MatTableDataSource(response);
      this.isLoading = false;
    });
  };
}
