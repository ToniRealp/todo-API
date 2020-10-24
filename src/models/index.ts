import { createConnection } from 'typeorm';
import { database } from '../configs';
import Task from './task-model';
import User from './user-model';


createConnection({ ...database, entities: [User, Task] })
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Failed connecting to PostgreSQL', err));


export { Task, User };
