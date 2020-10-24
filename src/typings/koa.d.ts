import * as Koa from 'koa';


declare module 'koa' {
  interface DefaultState {
      user: {
          id: string;
      };
  }
}
