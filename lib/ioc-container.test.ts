/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Register } from './decorators';
import { IoCContainer } from './ioc-container';

describe('Dependency Container', () => {
  let container: IoCContainer;

  beforeEach(() => {
    container = IoCContainer.instance;
  });

  it('should be a singleton', () => {
    const self = container;
    expect(self).toBeInstanceOf(IoCContainer);
  });

  it('Should not be able to get unregistered services', () => {
    interface IMovie {}
    // if not declare the decorator the should throw an error @Register('IMovie', [])
    class Movie implements IMovie {}

    const throwFunction = () => {
      container.resolve<IMovie>('IMovie');
    };

    expect(throwFunction).toThrow(`Unresolved dependency IMovie`);
  });

  it('Should throw ann error when depenency exists', () => {
    interface IMovie {}
    // if we call the register method more than once then an error should be thrown
    @Register('IMovie', [])
    class Movie implements IMovie {}

    const throwFunction = () => {
      container.register('IMovie', [], Movie);
    };

    expect(throwFunction).toThrow(`Dependency already register`);
  });
});
