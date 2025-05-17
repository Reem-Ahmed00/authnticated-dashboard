import { createTestStore } from '../../../testStore';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import Posts from './Posts';
import { MemoryRouter } from 'react-router-dom';

const mockPosts = [
  { id: 1, title: 'Post 1', content: 'Content 1' },
  { id: 2, title: 'Post 2', content: 'Content 2' },
  { id: 3, title: 'Post 3', content: 'Content 3' },
];


describe('Posts Component', () => {
  let store = createTestStore({
    posts: { posts: mockPosts },
    auth: { isAuthenticated: true, user: { username: 'user1' } },
  });

  beforeEach(() => {
    store = createTestStore({
      posts: { posts: mockPosts },
      auth: { isAuthenticated: true, user: { username: 'user1' } },
    });
  });

  test('renders all posts', () => {
    render(
      <MemoryRouter>
      <Provider store={store}>
        <Posts />
      </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
    expect(screen.getByText('Post 3')).toBeInTheDocument();
  });

});
