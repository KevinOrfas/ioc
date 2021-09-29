/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

import { IoCContainer } from './lib/ioc-container';
import { Register } from './lib/decorators';

import { IMovie, IPlayer, ISerie } from './interfaces';

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

const container = IoCContainer.instance;

// We have registered the deps via the decorator so if we re-register an error will be thrown
// container.register('IMovie', [], Movie);
// container.register('ISerie', [], Serie);
// container.register('IPlayer', ['IMovie', 'ISerie'], Player);

const movieClass = container.resolve<IMovie>('IMovie');
movieClass.playMovie();

const seriesClass = container.resolve<ISerie>('ISerie');
seriesClass.playEpisode();

const playerClass = container.resolve<IPlayer>('IPlayer');
playerClass.play();
