import Link from 'next/link'

async function getBlogs() {
  const res = await fetch('https://656469caceac41c0761e22d5.mockapi.io/blogs')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const blogs = await getBlogs()

  return (
    <div className='grid grid-cols-4 gap-2 my-4'>
      {
        blogs.map((blog, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure><img src={blog.imageUrl} /></figure>
            <div className="card-body">
              <h2 className="card-title">{blog.name}</h2>
              <p>{blog.description}</p>
              <div className="card-actions justify-end">
                <Link href={`/blog/${blog.id}`} className="btn btn-primary">Read blog</Link>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
