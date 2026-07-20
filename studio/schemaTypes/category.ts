import { defineType, defineField } from "sanity";

export const category = defineType({
  type: "document",
  name: "category",
  title: "Category",
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
      options: { source: "title", maxLength: 96 },
      validation: (e) => e.required(),
    }),
    defineField({
      type: "text",
      name: "description",
      title: "Description",
    }),
  ],
});