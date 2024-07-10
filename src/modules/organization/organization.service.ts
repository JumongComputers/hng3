import User from "../../models/user.model"
import Exception from "../../exception"
import Organization from "../../models/organization.model"
import { IOrganization, IUser, IUserOrgy } from "../../types"
import ERROR_MESSAGES from "../../constant/constants"
import UserOrganization from "../../models/userOrganization.model"





class OrganizationService {
    async createOrganization(organizationData:IOrganization) {
        const organizations = await Organization.findOne({
            where: { name: organizationData.name },
        })

        if (organizations) {
            throw new Exception(ERROR_MESSAGES.ORGANIZATION_EXISTS, 422)
        }
        
        const organization = await Organization.create({
            name: organizationData.name,
            description: organizationData.description,
        })
     
    
        return organization
           
          
        
    }

    async getOrganization():Promise<IOrganization[] | null>{
        const organizations = await Organization.findAll()

        if (!organizations){
            throw new Exception(ERROR_MESSAGES.ORGANIZATION_NOT_FOUND, 422)
        }

        return organizations
    }

    async getOneOrganization(orgId:string):Promise<IOrganization | null>{
        const organization = await Organization.findOne({where:{orgId}})
        
        if (!organization){
            throw new Exception(ERROR_MESSAGES.ORGANIZATION_NOT_FOUND, 422)
        }
        return organization
    }

    async addusertoorganization(orgId:string, userId:string):Promise<IUserOrgy | null>{
        
        const userOrganisation = await UserOrganization.findOne({where:{userId:userId, orgId:orgId}})
        if (!userOrganisation){
            throw new Exception(ERROR_MESSAGES.ORGANIZATION_NOT_FOUND, 422)
        }
        const userInOrganization = await UserOrganization.create({
            userId:userId,
            orgId:orgId,
        })
        return userInOrganization
    }

    
}

export default OrganizationService