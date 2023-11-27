'use server'

import { SignJWT, importJWK } from 'jose'
import { cookies } from 'next/headers'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

export async function login (prevState, formData) {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    console.log('email', email)
    console.log('password', password)

    // สมมุติว่า check กับ database หรือ api
    if (email === 'mike@test.com' && password === '1234') {
      // Login pass
      const secretJWK = {
        kty: 'oct',
        k: process.env.JOSE_SECRET // Replace with your actual base64 encoded secret key
      }

      const secretKey = await importJWK(secretJWK, 'HS256')
      const token = await new SignJWT({ email: 'mike@test.com' })
                    .setProtectedHeader({ alg: 'HS256' })
                    .setIssuedAt()
                    .setExpirationTime('1h') // Token expires in 1 hour
                    .sign(secretKey)
    
      cookies().set('token', token)
      redirect('/manage/blog')
    } else {
      throw new Error('Login fail')
    }
  } catch (error) {
    if(isRedirectError(error)) throw error
    console.log('error', error)
    return { message: 'Failed to create' }
  }
}
