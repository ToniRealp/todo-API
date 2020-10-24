import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import { User } from '../models';


export const login = async (ctx: Context) => {
  const user = await User.findOne({
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  });

  if (!user) {
    ctx.throw(404, 'Introduce a valid username  password');
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  ctx.body = { data: { token } };
};

export const find = async (ctx: Context) => {
  if (ctx.state.user.id !== ctx.params.id) {
    ctx.throw(401);
  }

  const user = await User.findOne(ctx.params.id);

  if (!user) {
    ctx.throw(404, `User with id ${ctx.params.id} not found`);
  }

  ctx.body = { data: { user } };
};

export const create = async (ctx: Context) => {
  const body = ctx.request.body as Partial<User>;

  const user = User.create(body);
  await user.save();

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  ctx.body = { message: 'Register successfully', data: { token } };
};

export const update = async (ctx: Context) => {
  if (ctx.state.user.id !== ctx.params.id) {
    ctx.throw(401);
  }

  const { affected } = await User.update(
    { id: ctx.params.id },
    ctx.request.body,
  );

  if (affected === 0) {
    ctx.throw(400, 'Invalid id');
  }

  ctx.body = { message: 'Update successful' };
};

export const remove = async (ctx: Context) => {
  if (ctx.state.user.id !== ctx.params.id) {
    ctx.throw(401);
  }

  const { affected } = await User.delete({ id: ctx.params.id });

  if (affected === 0) {
    ctx.throw(400, 'Delete unsuccessful');
  }

  ctx.body = { message: 'User delete successful' };
};
