const checkPermissions = (user = {}) => {
  return {
    isAdmin: !!user?.is_admin,
    canCreatePost: !!user?.is_admin || !!user?.is_editor,
  };
};

export default checkPermissions;
