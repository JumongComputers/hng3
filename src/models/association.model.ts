import User from './user.model';
import Organization from './organization.model';
import UserOrganization from './userOrganization.model';

// Many-to-many relationship
User.belongsToMany(Organization, { through: UserOrganization });
Organization.belongsToMany(User, { through: UserOrganization });

export { User, Organization, UserOrganization };
