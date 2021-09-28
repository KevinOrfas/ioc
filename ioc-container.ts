/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export class IoCContainer {
  private static _instance: IoCContainer = new IoCContainer();

  private _dependencies: { [key: string]: Record<string, unknown> } = {};

  private constructor() {
    if (IoCContainer._instance) {
      throw new Error('Singleton Class. Cannot instantiate using new');
    }
    IoCContainer._instance = this;
  }

  public static get instance(): IoCContainer {
    return IoCContainer._instance;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  register(name: string, dependencies: string[], implementation: any): void {
    if (this._dependencies[name]) {
      throw new Error('Dependency already register');
    }
    const dependenciesImplementations =
      this.getDependenciesImplemention(dependencies);
    // eslint-disable-next-line new-cap
    this._dependencies[name] = new implementation(
      ...dependenciesImplementations
    );
  }

  // make it generic as we use string as names so we need to get IDE's intelligence
  resolve<T>(name: string): T {
    if (!this._dependencies[name]) {
      throw new Error(`Unresolved dependency ${name}`);
    }
    return this._dependencies[name] as T;
  }

  private getDependenciesImplemention(
    names: string[]
  ): Record<string, unknown>[] {
    return names.map((name) => this.resolve(name));
  }
}
