import { Context } from 'koa';
import { Task } from '../models';


export const findAll = async (ctx: Context) => {
  const tasks = await Task.find({ owner: ctx.state.user.id });
  ctx.body = { data: { tasks } };
};

export const findOne = async (ctx: Context) => {
  const task = await Task.findOne(ctx.params.id);

  if (!task) {
    ctx.throw(404, 'Task does not exist');
  }

  if (task.owner !== ctx.state.user.id) {
    ctx.throw(401);
  }

  ctx.body = { data: { task } };
};

export const create = async (ctx: Context) => {
  const body = ctx.request.body as Partial<Task>;
  const task = await Task.create({ owner: ctx.state.user, ...body }).save();

  ctx.body = {
    message: 'Task creation successful',
    data: { task: task.serialize() },
  };
};

export const update = async (ctx: Context) => {
  const { affected } = await Task.update(ctx.request.body, {
    id: ctx.params.id,
    owner: ctx.state.user.id,
  });

  if (affected === 0) {
    ctx.throw(404, 'Task does not exist');
  }

  ctx.body = { data: { affected } };
};

export const remove = async (ctx: Context) => {
  const { affected } = await Task.delete({
    id: ctx.params.id,
    owner: ctx.state.user.id,
  });

  if (affected === 0) {
    ctx.throw(404, 'Task does not exist');
  }

  ctx.body = { message: 'Delete successful' };
};
