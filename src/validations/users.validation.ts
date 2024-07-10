
import Joi from 'joi'
import Exception from '../exception'
import { Request, Response, NextFunction } from 'express'
import { IUser } from '../types/index'

const signUpschema = Joi.object({
  firstName: Joi.string().required().min(3),
  lastName: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  telephone: Joi.string().required().min(11).max(14).trim(),
 
})


const loginschema = Joi.object({

  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),

})

const organizationschema = Joi.object({

  name: Joi.string().required().min(3),
  description: Joi.string().required().min(3),
})

export const validateSignup = (
  req: Request<{}, {}, IUser>, res: Response, next: NextFunction
) => {
 

   const {error} = signUpschema.validate(req.body)
   if (error) {

     const { details } = error
     const message = details.map((i) => i.message).join(',')
     next(new Exception (message, 422))
   }
   next()
}


export const validateLogin = (req:Request, res:Response, next:NextFunction) => {
  const { error } = loginschema.validate(req.body)
  if (error) {
    const { details } = error
    const message = details.map((i) => i.message).join(',')
    next(new Exception(message, 400))
  }
  next()
}

export const validateOrganization = (req:Request, res:Response, next:NextFunction) => {
  const { error } = organizationschema.validate(req.body)
  if (error) {
    const { details } = error
    const message = details.map((i) => i.message).join(',')
    next(new Exception(message, 400))
  }
  next()
}



