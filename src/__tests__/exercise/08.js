// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {renderHook, act} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function UseCounterHook() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>current count: {count}</div>
      <button onClick={decrement}>decrement</button>
      <button onClick={increment}>increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<UseCounterHook></UseCounterHook>)

  const increment = screen.getByRole("button", {name: /increment/i})
  const decrement = screen.getByRole("button", {name: /decrement/i})
  const message = screen.getByText(/current count/i)
  
  expect(message).toHaveTextContent("current count: 0")
  userEvent.click(increment)
  expect(message).toHaveTextContent("current count: 1")
  userEvent.click(decrement)
  expect(message).toHaveTextContent("current count: 0")
})

test('exposes the count and increment/decrement functions, but in a null component', () => {
  const { result } = renderHook(useCounter)
  
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test("allows customization of the initial count", () => {
  const { result } = renderHook(useCounter, {initialProps: {initialCount: 5}})
  
  expect(result.current.count).toBe(5)
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(5)
})

test("allows customization of the step", () => {
  const { result } = renderHook(useCounter, {initialProps: {step: 3}})
  
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test("allows step to be changed", () => {
  const { result, rerender } = renderHook(useCounter, {initialProps: {step: 3}})
  
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})
/* eslint no-unused-vars:0 */
