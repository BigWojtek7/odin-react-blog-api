import { render, screen, act, fireEvent } from '@testing-library/react';
import NotificationProvider from './NotificationProvider';
import NotificationContext from './NotificationContext';
import React from 'react';

const MockComponent = () => {
  const { addNotification } = React.useContext(NotificationContext);

  return (
    <button onClick={() => addNotification('Test message', 'info')}>
      Add Notification
    </button>
  );
};

describe('NotificationProvider', () => {
  vi.useFakeTimers();

  it('dodaje powiadomienie po wywołaniu addNotification', async () => {
    render(
      <NotificationProvider>
        <MockComponent />
      </NotificationProvider>
    );

    // Have to change to fireEvent, beacause userEvent is not working well with fake timers
    fireEvent.click(screen.getByText('Add Notification'));
    expect(screen.getByText('Test message')).toBeInTheDocument();
  }, 10000);

  it('usuwa powiadomienie automatycznie po 5 sekundach', async () => {
    render(
      <NotificationProvider>
        <MockComponent />
      </NotificationProvider>
    );

    // Have to change to fireEvent, beacause userEvent is not working well with fake timers
    fireEvent.click(screen.getByText('Add Notification'));
    expect(screen.getByText('Test message')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  }, 10000);
});
