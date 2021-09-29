import { Movie } from './classes';
import { IMovie, IPlayer, ISerie } from './interfaces';
import { IoCContainer } from './lib/ioc-container';

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
