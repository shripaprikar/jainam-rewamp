// schemaTypes/index.ts

import { blog } from "./blog";
import { author } from "./author";
import { callToAction } from "./calltoaction";
import { category } from "./category"; // 1. Import category
import { tag } from "./tag";           // 2. Import tag
import { glossary } from "./glossary";
import { faq } from "./faq"; // Import the FAQ schema

export const schemaTypes = [
  blog,
  author,
  callToAction,
  glossary,
  category, // 3. Add to the array
  tag,      // 4. Add to the array
  faq,      // Add the FAQ schema to the array
];