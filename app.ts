/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { IoCContainer, Register } from './ioc-container';

interface IMovie {
  playMovie(): void;
  pauseMovie(): void;
}

interface ISerie {
  playEpisode(): void;
  pauseEpisode(): void;
}

interface IPlayer {
  play(): void;
}

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
// container.register('IMovie', [], Movie);
// container.register('ISerie', [], Serie);
// container.register('IPlayer', ['IMovie', 'ISerie'], Player);

const movieClass = container.resolve<IMovie>('IMovie');
movieClass.playMovie();

const seriesClass = container.resolve<ISerie>('ISerie');
seriesClass.playEpisode();

const playerClass = container.resolve<IPlayer>('IPlayer');
playerClass.play();
