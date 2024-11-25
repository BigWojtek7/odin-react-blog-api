import checkPermissions from './checkPermissions';

describe('checkPermissions', () => {
  beforeEach(() => {
    vi.unmock('../utils/checkPermissions');
  });

  it('returns false for both isAdmin and canCreatePost when user is undefined', () => {
    const permissions = checkPermissions();
    expect(permissions.isAdmin).toBe(false);
    expect(permissions.canCreatePost).toBe(false);
  });

  it('returns false for both isAdmin and canCreatePost when user has no roles', () => {
    const user = {};
    const permissions = checkPermissions(user);
    expect(permissions.isAdmin).toBe(false);
    expect(permissions.canCreatePost).toBe(false);
  });

  it('returns true for both isAdmin and canCreatePost when user is an admin', () => {
    const user = { is_admin: true };
    const permissions = checkPermissions(user);
    expect(permissions.isAdmin).toBe(true);
    expect(permissions.canCreatePost).toBe(true);
  });

  it('returns false for isAdmin and true for canCreatePost when user is an editor', () => {
    const user = { is_editor: true };
    const permissions = checkPermissions(user);
    expect(permissions.isAdmin).toBe(false);
    expect(permissions.canCreatePost).toBe(true);
  });
});
