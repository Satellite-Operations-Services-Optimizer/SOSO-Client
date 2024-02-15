import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardHeader from '@/components/DashBoardHeader'
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Checks presence of search input
describe('DashboardHeader component', () => {
  it('renders the component with a search input', () => {
    useRouter.mockReturnValue({
      pathname: '/somepage',
    });

    render(<DashboardHeader />);
    
    const searchInput = screen.getByPlaceholderText('Search');
    
    expect(searchInput).toBeInTheDocument();
  });
});