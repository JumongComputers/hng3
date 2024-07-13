import { IUser } from './../../types/index';
import jwt  from 'jsonwebtoken';
import Exception from "../../exception"
import bcrypt from "bcryptjs"
import User from "../../models/user.model"
import ERROR_MESSAGES from "../../constant/constants"
// import { IUser } from '../../types';
import { string } from 'joi';


class UserService {
    async createUser(userData:IUser) {
        const userE = await User.findOne({
            where: { email: userData.email },
        })

        if (userE) {
            throw new Exception(ERROR_MESSAGES.USER_EXISTS, 422)
        }
    
        const hashedPassword = await bcrypt.hash(userData.password, 10) 

        const userd ={
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          password: hashedPassword,
        }
       
        const user = await User.create(
            userd
        )
        
        const payload = {
          id: user.id,
          email: user.email,
          password:hashedPassword
        }
        const jwtSecret = process.env.JWT_SECRET as string;
        
        const accessToken = jwt.sign(payload, jwtSecret, {
            expiresIn: '24hrs',
        })
        user.password = ""
        return {
            accessToken,
            user,
        }
    }

    async login(userData: IUser) {
        const { email, password } = userData;
    
        const user = await User.findOne({ where: { email } });
    
        if (!user) {
          throw new Exception(ERROR_MESSAGES.USER_NOT_FOUND, 422);
        }
    
        if (user.password === null) {
          throw new Exception(ERROR_MESSAGES.PASSWORD_IS_NULL, 422);
        }
    
        // TypeScript now knows user.password is a string
        const isMatch = await bcrypt.compare(password, user.password as string);
        if (!isMatch) {
          throw new Exception(ERROR_MESSAGES.USER_NOT_FOUND, 422);
        }
    
        const payload = {
          userId: user.userId,
          email: user.email,
        };
    
        const jwtSecret = process.env.JWT_SECRET as string;
    
        const accessToken = jwt.sign(payload, jwtSecret, {
          expiresIn: '24h',
        });
    
        user.password = "";
        return { accessToken, user };
      }
    
    async getUsers(id: string): Promise<IUser> {
      
          const user = await User.findOne({ where: { userId:id } }); // Assuming Sequelize
          
        if (!user) {
            throw new Exception(ERROR_MESSAGES.USER_NOT_FOUND, 422)
          } else {
        return user as IUser;
        }
      }
    
      }

export default UserService