import { createClient } from "@sanity/client";
export const client = createClient({
  projectId: "p93up0zs",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});