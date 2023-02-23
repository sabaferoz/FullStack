import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

test('renders blog titles and hides other information', async () => {
  const blog = {
    id: 1,
    title: "test-blog-title",
    url: "http://google.com",
    likes: 9,
    user: {username: test}
  }

  const initialState=[blog]

  jest
.spyOn(React, 'useState')
.mockImplementationOnce(() => [initialState, () => null])
.mockImplementation((x) => [x, () => null]); // ensures that the rest are unaffected

  const { container }= render(<App/>)

  const title = screen.getByText('Title: test-blog-title')
  expect(title).toBeDefined();

  const authorDiv = container.querySelector('.author')
  expect(authorDiv).not.toBeVisible();

  const urlDiv = container.querySelector('.url')
  expect(urlDiv).not.toBeVisible();

  const likesDiv = container.querySelector('.likes')
  expect(likesDiv).not.toBeVisible();
})

test('url and no of likes are shownwhen the view button is clicked',async () => {
  const blog = {
    id: 1,
    title: "test-blog-title",
    url: "http://google.com",
    likes: 9,
    user: {username: "test"}
  }

  const initialState=[blog]

  jest
.spyOn(React, 'useState')
.mockImplementationOnce(() => [initialState, () => null])
.mockImplementation((x) => [x, () => null]); // ensures that the rest are unaffected

  const { container }= render(<App/>)

  const button = screen.getByText("view")
  fireEvent.click(button)

   const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

  const urlDiv = container.querySelector('.url')
  expect(urlDiv).toHaveTextContent("http://google.com");

  const authorDiv = container.querySelector('.author')
  expect(authorDiv).toHaveTextContent("test");

  const likesDiv = container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent("9")
  
})

test('if like button is clicked twice, the event handler is called twice',async () => {
  const blog = {
    id: 1,
    title: "test-blog-title",
    url: "http://google.com",
    likes: 9,
    user: {username: "test"}
  }

  const mockLikesHandler = jest.fn()
  const mockNotificationHandler = jest.fn()

  const { container }= render(<Blog key={blog.id} blog={blog}  handleBlogChange={mockLikesHandler} handleNotificationChange={mockNotificationHandler}/> )
 
  const button = screen.getByText("Like")
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockLikesHandler.mock.calls).toHaveLength(2)

})

