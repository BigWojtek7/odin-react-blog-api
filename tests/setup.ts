import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Mock} from 'vitest';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

import useAuth from '../src/contexts/Auth/useAuth';
import checkPermissions from '../src/utils/checkPermissions';
import { vi } from 'vitest';

vi.mock('../src/contexts/Auth/useAuth', () => ({
  __esModule: true,
  default: vi.fn(), // Mockujemy funkcję useAuth
}));

global.mockedUseAuth = useAuth as Mock;
global.mockedCheckPermissions = checkPermissions as Mock;


