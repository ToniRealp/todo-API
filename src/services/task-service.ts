import { Task } from '../models';


export const findAll = async (owner: string) => Task.find({ where: { owner } });
