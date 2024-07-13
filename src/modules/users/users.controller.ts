// import { IUser } from './../../types/index';
import { Request, Response, NextFunction } from 'express';
import UserService from './users.service';
import  {IUser}  from '../../types/index';
import OrganizationService from '../organization/organization.service';

const userService = new UserService();
const organizationService = new OrganizationService();

interface Bod extends Request {
    body: {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password: string;
      // orgId?: string;
    };
  }

class UserController {
  signup= async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const {firstName, lastName, email, password, phone} = req.body;
      const result = await userService.createUser({
        ...req.body
          
      });
      const { accessToken, user } = result;

      if (!user) {
        throw {
          status: 'Bad request',
          message: 'Registration unsuccessful',
          statusCode: 400,
        };
      }

      // Concatenate user.firstName and organizationData.name
    //   const { description, } = req.body;
      const organization = await organizationService.createOrganization({
        name: `${user.firstName}'s organisation`,
        
      }, );

      if (!organization) {
        throw {
          status: 'Bad request',
          message: 'Organization creation unsuccessful',
          statusCode: 400,
        };
      }

      return res.status(201).json({
        status: 201,
        message: 'Registration successful',
        data: {
          accessToken,
          user,
        },
      });
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  };

  login = async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
    try {
      const user = await userService.login(req.body);
      if (!user) {
        throw {
          status: 'Bad request',
          message: 'Authentication failed',
          statusCode: 401,
        };
      }
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: user,
      });
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getUsers(req.params.id);
      if (!users) {
        throw {
          status: 'Bad request',
          message: 'Users not found',
          statusCode: 404,
        };
      }
      return res.status(200).json({
        status:'success',
        message: 'Users retrieved successfully',
        data: users,
      });
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  }
}



export default UserController;
