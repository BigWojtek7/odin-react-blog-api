import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotificationsList from './NotificationsList';

// Inicjalizacja mockowanych funkcji
let mockAddNotification = vi.fn();

// Mockowanie hooka Notification

const id = new Date().getTime();

const notifications = [
  {
    id: id,
    message: 'Info notification',
    type: 'info',
  },
  { id: 2, message: 'Error notification', type: 'error' },
];

describe('Notifications component', () => {
  it('renders notifications with message and buttons', () => {
    render(<NotificationsList notifications={notifications} />);

    expect(screen.getByText('Info notification')).toBeInTheDocument();
    expect(screen.getByText('Error notification')).toBeInTheDocument();
  });

  it('renders notifications with correct types using data-testid', () => {
    render(<NotificationsList notifications={notifications} />);

    expect(screen.getByTestId('notification-info')).toBeInTheDocument();
    expect(screen.getByTestId('notification-error')).toBeInTheDocument();
  });

  it('renders nothing if there are no notifications', () => {
    render(<NotificationsList notifications={[]} />);

    expect(
      screen.queryByText('The post has been deleted')
    ).not.toBeInTheDocument();
  });
});
