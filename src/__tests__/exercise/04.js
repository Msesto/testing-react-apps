// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from "faker"
import {build, fake} from "@jackfranklin/test-data-bot"

const buildLoginForm = build( {
  fields: {
    username: fake(f => faker.internet.userName()),
    password: fake(f => faker.internet.password()),
  }
}
)

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  const {username, password} = buildLoginForm()

  render(<Login onSubmit={handleSubmit}></Login>)
  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole("button", { name: /submit/i }))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
