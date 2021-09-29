/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

import { IMovie, IPlayer, ISerie } from '../interfaces';
import { Register } from '../lib/decorators';

@Register('IMovie', [])
class Movie implements IMovie {
  pauseMovie(): void {
    console.log('Paused Movie');
  }

  playMovie(): void {
    console.log('Playing Movie');
  }
}

@Register('ISerie', [])
class Serie implements ISerie {
  pauseEpisode(): void {
    console.log('Paused Episode');
  }

  playEpisode(): void {
    console.log('Playing Episode');
  }
}

@Register('IPlayer', ['IMovie', 'ISerie'])
class Player implements IPlayer {
  constructor(private movie: IMovie, private serie: ISerie) {
    this.movie = movie;
    this.serie = serie;
  }

  play(): void {
    this.movie.playMovie();
    this.serie.playEpisode();
    console.log('Playing all...');
  }
}

export { Movie, Serie, Player };
