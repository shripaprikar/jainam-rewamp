import { defineType, defineField } from "sanity";
export const faq = defineType({
  type: "document",
  name: "faq",
  title: "FAQ",
  fields: [
    defineField({
      type: "string",
      name: "Quetion",
      title: "Quetion",
      validation: (e) => e.required(),
    }),
    defineField({
      type: "text",
      name: "Answere",
      title: "Answere",
      validation: (e) => e.required(),
    }),
  ],
});


