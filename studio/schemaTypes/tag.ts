import { defineType, defineField } from "sanity";

export const tag = defineType({
  type: "document",
  name: "tag",
  title: "Tag",
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
  ],
});