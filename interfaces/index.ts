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

export { IMovie, ISerie, IPlayer };
