import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('when a form is submitted, the event handler is called with the right details',async () => {

  const updateBlogs = jest.fn()
  const mockNotificationHandler = jest.fn()
   const user = userEvent.setup()

  render(<BlogForm updateBlogs={updateBlogs} handleNotificationChange={mockNotificationHandler}/>)
 
  
  const inputs = screen.getAllByRole('textbox')
  const titleInput=inputs[0]
  const urlInput=inputs[1]
  const addBlogButton = screen.getByText("Add blog")

  await user.type(titleInput, 'test title')
  await user.type(urlInput, 'http://google.com')
  await user.click(addBlogButton)
  
  expect(updateBlogs.mock.calls).toHaveLength(1)
  expect(updateBlogs.mock.calls[0][0]).toBe('test title')
  expect(updateBlogs.mock.calls[0][1]).toBe('http://google.com')

})