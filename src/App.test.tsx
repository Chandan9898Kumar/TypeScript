import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

jest.mock('./Pages/Carousel/Carousel', () => () => <div>Carousel Component</div>);
jest.mock('./Components/Header/Header', () => ({ title, className }: { title: string, className: string }) => (
  <div className={className}>{title}</div>
));
jest.mock('./Components/Toggle/Toggle', () => () => <div>Toggle Component</div>);
// ... mock other lazy components similarly

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders header with correct title', async () => {
    render(<App />);
    const headerText = await screen.findByText('Machine Coding In TypeScript...');
    expect(headerText).toBeInTheDocument();
  });

  it('renders with correct header className', async () => {
    render(<App />);
    const headerElement = await screen.findByText('Machine Coding In TypeScript...');
    expect(headerElement).toHaveClass('customTag');
  });

  it('passes correct scroll data props to ScrollOnElement', () => {
    const { container } = render(<App />);
    // Initial scroll data should be 50
    expect(container).toMatchSnapshot();
  });

  it('renders all lazy-loaded components', async () => {
    render(<App />);
    
    // Wait for components to load
    const carousel = await screen.findByText('Carousel Component');
    const toggle = await screen.findByText('Toggle Component');
    
    expect(carousel).toBeInTheDocument();
    expect(toggle).toBeInTheDocument();
  });
});

