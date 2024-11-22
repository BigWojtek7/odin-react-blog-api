import { render, screen } from '@testing-library/react';
import Logo from './Logo';
import { describe } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('testing logo component', () => {
  it('renders logo component', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(screen.getByText('Daily Blog')).toBeInTheDocument();
  });
});
