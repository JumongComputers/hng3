export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string ;
    orgId?: string;
    
}


export interface IOrganization {
    name: string;
    description?: string;
    orgId?: string;

}

export interface IUserOrgy {
    userId: string;
    orgId: string
}