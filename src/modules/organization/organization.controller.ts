import { Request, Response, NextFunction } from "express";
import OrganizationService from "./organization.service";







const organizationService = new OrganizationService();

class OrganizationController{

    createOrganization = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description } = req.body;
            const organization = await organizationService.createOrganization(
                {name, description}
            );
            if (!organization) {
                throw {
                    status: "Bad request",
                    message: "Organization creation unsuccessful",
                    statusCode: 400,
                };
            }
            return res.status(201).json({
                status: 201,
                message: "Registration successful",
                data: {
                    organization,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    getOrganization = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const organizations = await organizationService.getOrganization();
            if (!organizations) {
                throw {
                    status: "Bad request",
                    message: "Organization not found",
                    statusCode: 404,
                };
            }
            return res.status(200).json({
                status: "success",
                message: "Organization found",
                data: organizations,
            });
        } catch (error) {
            next(error);
        }
    }

    getOneOrganization = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const organization = await organizationService.getOneOrganization(
                req.params.id
            );
            if (!organization) {
                throw {
                    status: "Bad request",
                    message: "Organization not found",
                    statusCode: 404,
                };
            }
            return res.status(200).json({
                status: "success",
                message: "Organization found",
                data: organization,
            });
        } catch (error) {
            next(error);
        }
    }

    AddUserToOrganization = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.body;
            const { orgId } = req.params;
            const organization = await organizationService.addUserToOrganization(
                orgId,
                userId
            );
            if (!organization) {
                throw {
                    status: "Bad request",
                    message: "Organization not found",
                    statusCode: 404,
                };
            }
            return res.status(200).json({
                status: "success",
                message: "User added to organisation successfully",
                // data: organization,
            });
        } catch (error) {
            next(error);
        }
    }
    
}

export default OrganizationController;

