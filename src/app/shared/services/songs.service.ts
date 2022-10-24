import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Songs, Song, SONGS_DB } from './songs.consts';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor() { }
  private songDatabase: Songs = [...SONGS_DB]

  private _isLoading = true;
  
  public get isLoading() {
    return this._isLoading;
  }
/**
 * 
 * @param id: String  
 * @returns song Object
 */

  public getbyId(id: string) {
    return of(this.songDatabase.find(song => song.id === id.toString()) || {} as Song);
  };
/**
 * 
 * @returns List of all available Songs
 */
  public get(): Observable<Songs> {
    return of(this.songDatabase);
  };

  /**
   * 
   * @param song of Type Song
   * @returns the Song just Created with new ID
   */
  public create(song: Song): Observable<Song> {
    let id = Math.floor(Math.random() * 999999999);
    this.songDatabase.push({...song, id: id.toString()});
    return of(song)
  };

  /**
   * 
   * @param song 
   * @returns the song just updated
   */
  public update(song: Song): Observable<Song> {
    this.songDatabase = this.songDatabase.map(item => {
      if (item.id === song.id) {
        return song;
      }
      return item;
    });
    return of(song)
  }
/**
 * 
 * @param id 
 * @returns the song just deleted based on ID
 */
  public delete(id: string): Observable<Song> {
    let song: Song = this.songDatabase.find(song => song.id === id.toString()) || {} as Song
    this.songDatabase = this.songDatabase.filter(function (item) {
      if (item.id === id.toString()) {
        song = item
      }
      return (item.id !== id);
    });
    return of(song);
  }
}
