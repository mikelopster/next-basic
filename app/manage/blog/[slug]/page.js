'use client'

import { useState, useEffect } from 'react'

export default function Page({ params }) {
  const [blogState, setBlogState] = useState({
    name: '',
    content: '',
    imageUrl: '',
    author: '',
    description: ''
  })

  const getBlog = async (slug) => {
    try {
      const res = await fetch(`https://656469caceac41c0761e22d5.mockapi.io/blogs/${slug}`)
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const result = await res.json()
      setBlogState(result)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setBlogState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Form Submitted', blogState)
    try {
      const response = await fetch(`https://656469caceac41c0761e22d5.mockapi.io/blogs/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogState)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const responseData = await response.json()
      console.log('Form submitted successfully', responseData)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  useEffect(() => {
    getBlog(params.slug)
  }, [params.slug])

  return (
    <div>
      My Post: {params.slug}
      <div>
        Blog detail 
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={blogState.name}
              onChange={handleChange}
            />
          </div>

          <button>Update</button>
        </form>
      </div>
    </div>
  )
}