import { headers } from 'next/headers'
import Link from 'next/link'

async function getBlogs() {
  const res = await fetch('https://656469caceac41c0761e22d5.mockapi.io/blogs')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const headersList = headers()
  const user = JSON.parse(headersList.get('user'))
  const blogs = await getBlogs()

  return (
    <div>
      <div>You are: {user.email}</div>
      {
        blogs.map((blog, index) => (
          <div key={index}>
            {blog.name}
            <Link href={`/manage/blog/${blog.id}`}>Edit</Link>
          </div>
        ))
      }
    </div>
  )
}