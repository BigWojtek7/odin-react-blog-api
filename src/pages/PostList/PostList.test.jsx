import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostLists from './PostLists';
import { MemoryRouter } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import useNotification from '../../hooks/useNotification';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';

vi.mock('../../hooks/useAuth');
vi.mock('../../hooks/useFetch');
vi.mock('../../hooks/useModal');
vi.mock('../../hooks/useNotification');

vi.mock('../../utils/requestWithNativeFetch.js')

describe('PostLists component', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user: { is_admin: true }, token: 'test-token' });
    useModal.mockReturnValue({
      openModal: vi.fn(),
      closeModal: vi.fn(),
    });
    useNotification.mockReturnValue({
      addNotification: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders posts when there are posts available', async () => {
    useFetch.mockReturnValue({
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
    useFetch.mockReturnValue({
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

    requestWithNativeFetch.mockResolvedValue({
      success: true,
    });

    useFetch.mockReturnValue({
      fetchData: [
        { id: 1, title: 'Post 1', content: 'Content 1' },
        { id: 2, title: 'Post 2', content: 'Content 2' },
      ],
      setFetchData: mockSetFetchData,
    });
    useModal.mockReturnValue({
      openModal: mockOpenModal,
      closeModal: vi.fn(),
    });
    useNotification.mockReturnValue({
      addNotification: mockAddNotification,
    });

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
