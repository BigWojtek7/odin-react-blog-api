declare module '*.css';

import { Mock } from 'vitest';

declare global {
  var mockedUseAuth: Mock;
  var mockedCheckPermissions: Mock;
}

export {};
