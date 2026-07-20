// schemaTypes/index.ts

import { blog } from "./blog";
import { author } from "./author";
import { callToAction } from "./calltoaction";
import { category } from "./category"; // 1. Import category
import { tag } from "./tag";           // 2. Import tag
import { glossary } from "./glossary";

export const schemaTypes = [
  blog,
  author,
  callToAction,
  glossary,
  category, // 3. Add to the array
  tag,      // 4. Add to the array
];