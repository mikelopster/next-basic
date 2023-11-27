'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from './action'

export default async function Page() {
  const initialState = {
    message: null,
  }

  const [state, formAction] = useFormState(login, initialState)

  return (
    <div>
      <form action={formAction}>
        <div>Email <input name="email" /></div>
        <div>Password <input name="password" type="password" /></div>
        <button>Login</button>
        <div>
          Error: {state?.message}
        </div>
      </form>
    </div>
  )
}
