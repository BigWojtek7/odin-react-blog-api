import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostPage from './PostPage';
import useFetch from '../../hooks/useFetch';
import { mockedUseFetch, mockedUseParams } from '../../../tests/setup';



describe('PostPage', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    content: 'This is a test post.',
    username: 'testuser',
    date_format: '2024-11-02',
  };

  beforeEach(() => {
    mockedUseFetch.mockReturnValue({
      fetchData: mockPost,
    });
    mockedUseParams.mockReturnValue({ postid: '1' });
  });

  it('renders the post and comments', () => {
    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <PostPage />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('calls useFetch with the correct URL', () => {
    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <PostPage />
      </MemoryRouter>
    );

    expect(useFetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/posts/1`
    );
  });
});
