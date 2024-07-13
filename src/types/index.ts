export interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    orgId?: string;
    
}


export interface IOrganization {
    orgId?: string;
    name?: string ;
    description?: string;
    
  }

export interface IUserOrgy {
    userId: string;
    orgId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  