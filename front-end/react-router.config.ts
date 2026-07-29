import type { Config } from "@react-router/dev/config";

export default {
  // Disable SSR so the build can be served from a static host/public folder.
  ssr: false,
} satisfies Config;
