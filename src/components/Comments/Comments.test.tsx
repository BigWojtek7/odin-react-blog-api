import { render, screen } from '@testing-library/react';
import Comments from './Comments';
import { MemoryRouter } from 'react-router-dom';
import { mockedUseFetch } from '../../../tests/setup';

describe('Comments component', () => {
  beforeAll(() => {
    vi.unmock('react-router-dom');
  });
  const commentsData = [
    {
      id: 1,
      username: 'User1',
      content: 'Test comment 1',
      date_format: '2024-10-29',
    },
    {
      id: 2,
      username: 'User2',
      content: 'Test comment 2',
      date_format: '2024-10-30',
    },
  ];

  beforeEach(() => {
    mockedUseFetch.mockReturnValue({
      fetchData: commentsData,
      setFetchData: vi.fn(),
    });
  });

  it('renders Comments component and title', () => {
    render(
      <MemoryRouter>
        <Comments postid="1" />
      </MemoryRouter>
    );
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('renders "No comments yet" when there are no comments', () => {
    mockedUseFetch.mockReturnValue({ fetchData: [], setFetchData: vi.fn() });
    render(
      <MemoryRouter>
        <Comments postid="1" />
      </MemoryRouter>
    );
    expect(screen.getByText('No comments yet')).toBeInTheDocument();
  });

  it('renders list of comments when comments are present', () => {
    render(
      <MemoryRouter>
        <Comments postid="1" />
      </MemoryRouter>
    );
    commentsData.forEach((comment) => {
      expect(screen.getByText(comment.content)).toBeInTheDocument();
      expect(screen.getByText(comment.username)).toBeInTheDocument();
    });
  });

  it('renders CommentForm component', () => {
    render(
      <MemoryRouter>
        <Comments postid="1" />
      </MemoryRouter>
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});
