import type { SanityDocument } from "@sanity/client";
import { Link } from "react-router";
import { client } from "~/sanity/client";
import type { Route } from "./+types/home";
import { PortableText } from "@portabletext/react";
import AboutBlock from "~/components/custom/about-block";
export const BLOG_QUERY = `*[
  _type == "blog"
  && defined(slug.current)
] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  image,
  author->{
    name,
    title,
    portrait
  },
  categories[]->{
    title,
    "slug": slug.current
  },
  tags[]->{
    title,
    "slug": slug.current
  }
}`;
export async function clientLoader() {
  return { blogs: await client.fetch<SanityDocument[]>(BLOG_QUERY) };
}
export default function IndexPage({ loaderData }: Route.ComponentProps) {
  const { blogs } = loaderData;
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <AboutBlock />
      <h1 className="text-4xl font-bold mb-8">Blogs</h1>
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
    timeZone: "UTC", // Forces exact same day regardless of server/browser location
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