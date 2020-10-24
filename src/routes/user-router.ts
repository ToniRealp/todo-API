import Router from 'koa-router';
import { User } from '../controllers';
import { protect } from '../middlewares';


const router = new Router({ prefix: '/users' });

router.post('/register', User.create);
router.post('/login', User.login);

router.use('/:id', protect());
router.get('/:id', User.find);
router.put('/:id', User.update);
router.del('/:id', User.remove);


export default router;
