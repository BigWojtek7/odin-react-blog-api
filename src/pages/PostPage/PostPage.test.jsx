import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PostPage from './PostPage';
import useFetch from '../../hooks/useFetch';

import AuthProvider from '../../contexts/Auth/AuthProvider';
import LoaderProvider from '../../contexts/Loader/LoaderProvider';
import NotificationProvider from '../../contexts/Notification/NotificationProvider';
import { useParams } from 'react-router-dom';

vi.mock('../../hooks/useFetch');
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

describe('PostPage', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    content: 'This is a test post.',
    username: 'testuser',
    date_format: '2024-11-02',
  };

  beforeEach(() => {
    useFetch.mockReturnValue({
      fetchData: mockPost,
    });
    useParams.mockReturnValue({ postid: '1' });
  });

  it('renders the post and comments', () => {
    render(
      <NotificationProvider>
        <LoaderProvider>
          <AuthProvider>
            <MemoryRouter initialEntries={['/posts/1']}>
              <PostPage />
            </MemoryRouter>
          </AuthProvider>
        </LoaderProvider>
      </NotificationProvider>
    );

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('calls useFetch with the correct URL', () => {
    render(
      <NotificationProvider>
        <LoaderProvider>
          <AuthProvider>
            <MemoryRouter initialEntries={['/posts/1']}>
              <PostPage />
            </MemoryRouter>
          </AuthProvider>
        </LoaderProvider>
      </NotificationProvider>
    );

    expect(useFetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/posts/1`
    );
  });
});
