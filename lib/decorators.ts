/* eslint-disable @typescript-eslint/ban-types */

import { IoCContainer } from './ioc-container';

function Register(name: string, dependencies: string[]): Function {
  const container = IoCContainer.instance;
  return function <T extends { new (...args): {} }>(constructor: T): void {
    container.register(name, dependencies, constructor);
  };
}

export { Register };
