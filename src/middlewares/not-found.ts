import { Context } from 'koa';


export default () => (ctx: Context) => {
  ctx.body = { error: 'Not found. Make sure resource exists.' };
};
