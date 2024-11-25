interface User {
  is_admin: boolean;
  is_editor: boolean;
}
interface Permissions {
  isAdmin: boolean;
  canCreatePost: boolean;
}

const defaultUser: User = {
  is_admin: false,
  is_editor: false,
};

const checkPermissions = (user: Partial<User> = defaultUser): Permissions => {
  return {
    isAdmin: !!user?.is_admin,
    canCreatePost: !!user?.is_admin || !!user?.is_editor,
  };
};

export default checkPermissions;
