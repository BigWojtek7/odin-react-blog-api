import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotificationsList from './NotificationsList';

// Inicjalizacja mockowanych funkcji
let mockAddNotification = vi.fn();

// Mockowanie hooka Notification

const id = new Date().getTime();

const notifications = [{
  id: id,
  message: 'The post has been deleted',
  type: 'info',
}];

describe('Notifications component', () => {
  it('renders notifications with message and buttons', () => {
    render(<NotificationsList notifications={notifications} />);

    expect(screen.getByText('The post has been deleted')).toBeInTheDocument();
  });

});
