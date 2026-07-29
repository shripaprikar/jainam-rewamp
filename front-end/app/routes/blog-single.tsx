import { Link } from "react-router";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import type { Route } from "./+types/blog-single";
import { client } from "~/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const BLOG_QUERY = `*[
  _type == "blog"
  && slug.current == $slug
][0] {
  _id,
  title,
  "slug": slug.current,
  date,
  image,
  content,
  callToAction,
  author->{
    name,
    title,
    portrait,
    bio
  },
  categories[]->{
    title,
    "slug": slug.current
  },
  tags[]->{
    title,
    "slug": slug.current
  },
  seoTitle,
  seoDescription,
  seoKeywords
}`;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { post: await client.fetch<SanityDocument>(BLOG_QUERY, params) };
}

// 1. React Router v7 Meta Function for SEO
export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.post) {
    return [{ title: "Post Not Found" }];
  }

  const { post } = loaderData;
  const pageTitle = post.seoTitle || post.title;
  const ogImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(630).url()
    : null;

  return [
    { title: pageTitle },
    { name: "description", content: post.seoDescription },
    { name: "keywords", content: post.seoKeywords },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: post.seoDescription },
    { property: "og:type", content: "article" },
    ogImageUrl ? { property: "og:image", content: ogImageUrl } : null,
  ].filter(Boolean); // Filters out any null values
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(800).height(450).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-6">
      <Link to="/blog" className="text-blue-600 hover:underline w-fit">
        ← Back to posts
      </Link>

      {/* Categories */}
      {post.categories && post.categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {post.categories.map((category: { title: string; slug: string }) => (
            <span
              key={category.slug}
              className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md"
            >
              {category.title}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>

      {/* Author & Date Bar */}
      <div className="flex items-center justify-between border-y py-4 my-2 text-sm text-gray-600">
        <div className="flex items-center gap-3">
          {post.author?.portrait && (
            <img
              src={urlFor(post.author.portrait)?.width(48).height(48).url() || ""}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-medium text-gray-900">{post.author?.name}</p>
            {post.author?.title && <p className="text-xs text-gray-500">{post.author.title}</p>}
          </div>
        </div>
        {/* Changed from publishedAt to date */}
        {post.date && (
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        )}
      </div>

      {/* Featured Image */}
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl object-cover w-full shadow-sm"
          width="800"
          height="450"
        />
      )}

      {/* Blog Content - Changed from body to content */}
      <div className="prose prose-lg max-w-none mt-4">
        {/* {Array.isArray(post.content) && <PortableText value={post.content} />} */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Call to Action Banner */}
      {post.callToAction && (
        <div className="my-8 p-8 bg-gray-50 border rounded-2xl flex flex-col items-center text-center gap-4">
          <a
            href={post.callToAction.url}
            target={post.callToAction.openInNewTab ? "_blank" : "_self"}
            rel={post.callToAction.openInNewTab ? "noopener noreferrer" : ""}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm"
          >
            {post.callToAction.label}
          </a>
        </div>
      )}

      {/* Tags Footer */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-8 pt-6 border-t">
          <span className="text-sm font-medium text-gray-500 mr-2">Tags:</span>
          {post.tags.map((tag: { title: string; slug: string }) => (
            <span
              key={tag.slug}
              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              #{tag.title}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}