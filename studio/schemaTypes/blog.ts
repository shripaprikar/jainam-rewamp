import { defineType, defineField, defineArrayMember } from "sanity";

export const blog = defineType({
  type: "document",
  name: "blog",
  title: "Blog",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (e) => e.required(),
    }),
    defineField({
      type: "date",
      name: "date",
      title: "Date",
      validation: (e) => e.required(),
    }),
    defineField({ 
      type: "image", 
      name: "image", 
      title: "Image",
      options: {
        hotspot: true, // Recommended for better cropping control
      },
    }),
    defineField({
      type: "array",
      name: "content",
      title: "Content",
      validation: (e) => e.required(),
      of: [defineArrayMember({ type: "block" })],
    }),
    // Single Reference to Author
    defineField({
      type: "reference",
      name: "author",
      title: "Author",
      to: [{ type: "author" }],
      validation: (e) => e.required(),
    }),
    // Multiple References to Categories
    defineField({
      type: "array",
      name: "categories",
      title: "Categories",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "category" }],
        }),
      ],
      validation: (e) => e.unique(), // Prevents selecting the same category twice
    }),
    // Multiple References to Tags
    defineField({
      type: "array",
      name: "tags",
      title: "Tags",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "tag" }],
        }),
      ],
      validation: (e) => e.unique(),
    }),
    // defineField({
    //   type: "callToAction",
    //   name: "callToAction",
    //   title: "Call To Action",
    // }),
    defineField({
      type: "string",
      name: "seoTitle",
      title: "SEO Title",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "text",
      name: "seoDescription",
      title: "SEO Description",
    }),
    defineField({ 
      type: "string", 
      name: "seoKeywords", 
      title: "SEO Keywords" 
    }),
  ],
});