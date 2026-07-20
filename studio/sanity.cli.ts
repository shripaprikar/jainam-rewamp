import {defineCliConfig} from 'sanity/cli'

const api = {
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET
} as const

// Attach token from environment, if provided, without polluting the typed `api` object
if (process.env.SANITY_API_TOKEN) {
  ;(api as any).token = process.env.SANITY_API_TOKEN
}

export default defineCliConfig({
  api,
  // If you need to use a token with the CLI, set it via environment variable and
  // handle it outside the typed `api` object to satisfy TypeScript types.
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
