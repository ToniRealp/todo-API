import 'reflect-metadata';
import 'dotenv/config';
import Koa from 'koa';
import { error, json, logger, notFound } from './middlewares';
import { Task, User } from './routes';


const app = new Koa();

app.use(error());
app.use(json());
app.use(logger());

app.use(Task.routes());
app.use(User.routes());

app.use(notFound());

app.listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`));
