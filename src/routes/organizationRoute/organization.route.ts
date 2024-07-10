
import { Router } from "express";
import OrganizationController from "../../modules/organization/organization.controller";
import { isLoggedIn } from "../../middleware/authentication";






const organizationRouter = Router();


const organizationController = new OrganizationController();




organizationRouter.post('/orgaizations', isLoggedIn, organizationController.createOrganization)
organizationRouter.post('/orgaizations', organizationController.AddUserToOrganization)
organizationRouter.get('/orgaizations', isLoggedIn, organizationController.getOrganization)
organizationRouter.get('/orgaizations/:orgId', isLoggedIn, organizationController.getOneOrganization)




export default organizationRouter;