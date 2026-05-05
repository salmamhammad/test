import { userService } from '../services/user.service';

export const userController = {
  async register(req: any, res: any) {
    try {
      const user = await userService.register(req.body);
      res.json(user);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  },

  async login(req: any, res: any) {
    try {
      const data = await userService.login(req.body.email, req.body.password);
      res.json(data);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  },

  async getById(req: any, res: any) {
    try {
      const user = await userService.getById(req.user, req.params.id);
      res.json(user);
    } catch (e: any) {
      const status = e.message === 'User not found' ? 404 : 403;
      res.status(status).json({ message: e.message });
    }
  },

  async getAll(req: any, res: any) {
    try {
      const users = await userService.getAll(req.user);
      res.json(users);
    } catch (e: any) {
      res.status(403).json({ message: e.message });
    }
  },

  async block(req: any, res: any) {
    try {
      const user = await userService.blockUser(req.user, req.params.id);
      res.json(user);
    } catch (e: any) {
      const status = e.message === 'User not found' ? 404 : 403;
      res.status(status).json({ message: e.message });
    }
  },
};
