import { flatMap } from 'lodash';
import { Context, Next } from 'koa';
import { ValidationError } from 'class-validator';
import { QueryFailedError } from 'typeorm';
import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';


export default () => async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    if (Array.isArray(error)) {
      const errors = flatMap(error, err => {
        if (err instanceof ValidationError) {
          return Object.values(err.constraints);
        }

        return null;
      });

      if (errors.length !== 0) {
        ctx.status = 400;
        ctx.body = { errors };
        return;
      }
    }

    if (error instanceof QueryFailedError) {
      switch (error.code) {
        case PG_UNIQUE_VIOLATION:
          if (error.table === 'users') {
            ctx.status = 400;
            ctx.body = { error: 'Email is already taken' };
            return;
          }
          break;
        default:
          break;
      }
    }

    if (error.status === 401) {
      ctx.status = 401;
      ctx.body = { error: 'Not authorized to use this resource' };
      return;
    }

    if (error.statusCode || error.status) {
      ctx.status = error.statusCode || error.status;
      ctx.body = {
        error: error.message,
      };

      return;
    }

    ctx.status = 500;
    ctx.body = { error: 'Something went wrong in our servers' };
  }
};
