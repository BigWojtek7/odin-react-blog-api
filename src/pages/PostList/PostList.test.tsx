import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostLists from './PostList';
import { MemoryRouter } from 'react-router-dom';

import {
  mockedCheckPermissions,
  mockedUseModal,
  mockedUseNotification,
  mockedUseFetch,
  mockedRequestWithNativeFetch,
} from '../../../tests/setup';

describe('PostLists component', () => {
  it('renders posts when there are posts available', async () => {
    mockedUseFetch.mockReturnValue({
      fetchData: [
        { id: 1, title: 'Post 1', content: 'Content 1' },
        { id: 2, title: 'Post 2', content: 'Content 2' },
      ],
      setFetchData: vi.fn(),
    });

    render(
      <MemoryRouter>
        <PostLists />
      </MemoryRouter>
    );

    expect(screen.getByText('All blog posts:')).toBeInTheDocument();
    expect(await screen.findByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('renders "No post yet" message when there are no posts', async () => {
    mockedUseFetch.mockReturnValue({
      fetchData: [],
      setFetchData: vi.fn(),
    });

    render(
      <MemoryRouter>
        <PostLists />
      </MemoryRouter>
    );

    expect(screen.getByText('All blog posts:')).toBeInTheDocument();
    expect(screen.getByText('No post yet')).toBeInTheDocument();
  });

  it('calls openModal and handles post deletion when delete is confirmed', async () => {
    const mockSetFetchData = vi.fn();
    const mockOpenModal = vi.fn((_, confirmCallback) => confirmCallback());
    const mockAddNotification = vi.fn();

    mockedRequestWithNativeFetch.mockResolvedValue({
      success: true,
    });

    mockedUseFetch.mockReturnValue({
      fetchData: [
        { id: 1, title: 'Post 1', content: 'Content 1' },
        { id: 2, title: 'Post 2', content: 'Content 2' },
      ],
      setFetchData: mockSetFetchData,
    });
    mockedUseModal.mockReturnValue({
      openModal: mockOpenModal,
      closeModal: vi.fn(),
      modalData: null,
    });
    mockedUseNotification.mockReturnValue({
      addNotification: mockAddNotification,
    });

    mockedCheckPermissions.mockReturnValueOnce({ isAdmin: true });

    render(
      <MemoryRouter>
        <PostLists />
      </MemoryRouter>
    );

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOpenModal).toHaveBeenCalled();
      expect(mockSetFetchData).toHaveBeenCalled();
      expect(mockAddNotification).toHaveBeenCalledWith(
        'The post has been deleted',
        'success'
      );
    });
  });
});
