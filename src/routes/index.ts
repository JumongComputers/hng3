import { Router, Request, Response } from 'express';
import userRouter from './userRoute/user.route';
import organizationRouter from './organizationRoute/organization.route';

const router = Router();





router.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});



router.use('/users', userRouter)
router.use('/organizations', organizationRouter)

export default router;
