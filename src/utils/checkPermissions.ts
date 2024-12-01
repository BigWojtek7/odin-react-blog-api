import { User } from '../types/SharedInterfaces';
interface Permissions {
  isAdmin: boolean;
  // canCreatePost: boolean;
}

const defaultUser: User = {
  is_admin: false,
  username: '',
};

const checkPermissions = (
  user: Partial<User> | null = defaultUser
): Permissions => {
  return {
    isAdmin: !!user?.is_admin,
    // canCreatePost: !!user?.is_admin || !!user?.is_editor,
  };
};

export default checkPermissions;
