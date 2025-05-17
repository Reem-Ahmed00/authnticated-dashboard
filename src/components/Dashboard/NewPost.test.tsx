import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import NewPost from './NewPost';
import { createTestStore } from '../../../testStore'; // adjust path if needed
import { useNavigate } from 'react-router-dom';

// ✅ Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
const mockedNavigate = jest.fn();
(useNavigate as jest.Mock).mockImplementation(() => mockedNavigate);

describe('NewPost Component', () => {
  it('dispatches addPost and navigates on form submit', () => {
    const store = createTestStore({
      auth: { user: { username: 'reem' } },
      posts: { posts: [] },
    });

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <MemoryRouter>
        <Provider store={store}>
          <NewPost />
        </Provider>
      </MemoryRouter>
    );

    // Fill form fields
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Test Post' },
    });

    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: 'This is a test post.' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Publish/i }));

    // Assert dispatch called
    expect(dispatchSpy).toHaveBeenCalled();

    // Assert navigation
    expect(mockedNavigate).toHaveBeenCalledWith('/posts');

    dispatchSpy.mockRestore(); // optional cleanup
  });
});
