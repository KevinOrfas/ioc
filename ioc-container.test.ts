/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
});
