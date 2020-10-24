import Router from 'koa-router';
import { Task } from '../controllers';
import { protect } from '../middlewares';


const router = new Router({ prefix: '/tasks' });

router.use(protect());

router.get('/', Task.findAll);
router.post('/', Task.create);

router.get('/:id', Task.findOne);
router.put('/:id', Task.update);
router.del('/:id', Task.remove);

export default router;
