import { Organization } from "../../models/organization.model";
import { IOrganization, IUserOrgy } from "../../types";
import Exception from "../../exception";
import ERROR_MESSAGES from "../../constant/constants";
import UserOrganization from "../../models/userOrganization.model";
import User from "../../models/user.model";

class OrganizationService {
  async createOrganization(organizationData: IOrganization) {
    const existingOrganization = await Organization.findOne({
      where: { name: organizationData.name },
    });

    if (existingOrganization) {
      throw new Exception(ERROR_MESSAGES.ORGANIZATION_EXISTS, 422);
    }

    const orgd = {
      name: organizationData.name,
      description: organizationData.description,
    }

    const organization = await Organization.create(orgd);

    return organization;
  }

  async getOrganization(): Promise<IOrganization[] | null> {
    const organizations = await Organization.findAll();

    if (!organizations) {
      throw new Exception(ERROR_MESSAGES.ORGANIZATION_NOT_FOUND, 422);
    }

    return organizations;
  }

  async getOneOrganization(orgId: string): Promise<IOrganization | null> {
    const organization = await Organization.findOne({ where: { orgId } });

    if (!organization) {
      throw new Exception(ERROR_MESSAGES.ORGANIZATION_NOT_FOUND, 422);
    }
    return organization;
  }

  async addUserToOrganization(orgId: string, userId: string): Promise<IUserOrgy | null> {
    // Check if the organization exists
    const organization = await Organization.findOne({where:{orgId}});
    if (!organization) {
      throw new Exception(ERROR_MESSAGES.ORGANIZATION_NOT_FOUND, 422);
    }

    // Check if the user exists
    const user = await User.findOne({where:{userId}});
    if (!user) {
      throw new Exception(ERROR_MESSAGES.USER_NOT_FOUND, 422);
    }

    // Check if the user is already associated with the organization
    const existingUserOrganization = await UserOrganization.findOne({
      where: { userId, orgId }
    });

    if (existingUserOrganization) {
      throw new Exception(ERROR_MESSAGES.USER_EXISTS, 422);
    }

    // Create the user-organization association
    const userOrganizationAttributes = {
      userId:userId ,
      orgId:orgId ,
    };

    const userInOrganization = await UserOrganization.create(userOrganizationAttributes);

    return userInOrganization;
  }
}

export default OrganizationService;
