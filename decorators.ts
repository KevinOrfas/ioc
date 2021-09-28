/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
export function disable(
  target: Object,
  methodName: string,
  descriptor: PropertyDescriptor
): void {
  descriptor.value = () => {
    throw new Error('Method is disabled');
  };
}

// Decorator factory
export function before(hook: Function): Function {
  return function <T extends Function>(
    target: Object,
    methodName: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    return {
      get(this: T) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const originalMethod = descriptor.value.bind(this);
        hook = hook.bind(this);
        return () => {
          hook();
          originalMethod();
        };
      },
    };
  };
}

// class decorator
export function capitalize(): Function {
  return function <T extends { new (...args): {} }>(constructor: T): T {
    return class extends constructor {
      title = 'Life';

      director = 'Daryl';
    };
  };
}

@capitalize()
export class Documentary {
  private title = 'life';

  private director = 'daryl';

  // @disable
  play(): void {
    console.log('playing documentry');
  }

  @before(() => {
    console.log('Before hook');
  })
  pause(): void {
    console.log('pause documentry');
  }

  log(): void {
    console.log(this.title, this.director);
  }
}

const documentary = new Documentary();
documentary.play();
documentary.pause();
documentary.log();
