import { AppPages } from '../router';

export interface IRoute<T extends object> {
  name: string;
  params: T;
}

export class AppRoutes {
  private constructor() {}

  static getMain() {
    return getRoute(AppPages.main, {});
  }

  static getResult() {
    return getRoute(AppPages.result, {});
  }
}

function getRoute<T extends object>(name: string, params: T): IRoute<T> {
  return {
    name,
    params,
  };
}
