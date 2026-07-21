import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = () => new Response(null, { status: 404 });

export default function WellKnown() {
  return null;
}
