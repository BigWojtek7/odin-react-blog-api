import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';
import { useParams } from 'react-router-dom';

import * as ReactRouterDom from 'react-router-dom';
import { Mock } from 'vitest';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// useAuth mock
export const mockedUseAuth = vi.fn(() => ({
  user: { username: 'defaultUser', is_admin: false },
  token: 'defaultToken',
  loginAction: vi.fn(),
  signUpAction: vi.fn(),
  logOut: vi.fn(),
}));

vi.mock('../src/contexts/Auth/useAuth', () => ({
  default: mockedUseAuth,
}));

// useLoader mock
export const mockedUseLoader = vi.fn(() => ({
  start: vi.fn(),
  stop: vi.fn(),
}));

vi.mock('../src/contexts/Loader/useLoader', () => ({
  default: mockedUseLoader,
}));

// useModal mock

export const mockedUseModal = vi.fn(() => ({
  openModal: vi.fn(),
  closeModal: vi.fn(),
  modalData: null,
}));

vi.mock('../src/contexts/Modal/useModal', () => ({
  default: mockedUseModal,
}));

// useNotification mock

export const mockedUseNotification = vi.fn(() => ({
  addNotification: vi.fn(),
}));

vi.mock('../src/contexts/Notification/useNotification', () => ({
  default: mockedUseNotification,
}));

// useFetch mock

export const mockedUseFetch = vi.fn();

vi.mock('../src/hooks/useFetch', () => ({
  default: mockedUseFetch,
}));

// react-router-dom mock
vi.mock('react-router-dom', async (importOriginal) => {
  const actual: typeof ReactRouterDom = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

export const mockedUseParams = useParams as Mock;

// requestWithNativeFetch mock

export const mockedRequestWithNativeFetch = vi.fn();

vi.mock('../src/utils/requestWithNativeFetch', () => ({
  default: mockedRequestWithNativeFetch,
}));

// usePermission mock

export const mockedCheckPermissions = vi.fn(() => ({ isAdmin: false }));

vi.mock('../src/utils/checkPermissions', () => ({
  default: mockedCheckPermissions,
}));

