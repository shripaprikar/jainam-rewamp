import type { SanityDocument } from "@sanity/client";
import { Link } from "react-router";
import { client } from "~/sanity/client";
import type { Route } from "./+types/blog-list";
import { PortableText } from "@portabletext/react";

export const BLOG_QUERY = `*[
  _type == "blog"
  && defined(slug.current)
] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  image,
  content
}`;

export async function loader() {
  return { blogs: await client.fetch<SanityDocument[]>(BLOG_QUERY) };
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const { blogs } = loaderData;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Blogs List</h1>
      <ul className="flex flex-col gap-y-4">
        {blogs.map((blog) => (
          <li className="hover:underline" key={blog._id}>
            <Link to={`/blog/${blog.slug}`}>
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </p>
              <PortableText value={blog.content} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}