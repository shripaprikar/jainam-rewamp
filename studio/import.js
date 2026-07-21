import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';
import { createClient } from '@sanity/client';

// 1. Capture the XML file path from the bash arguments
// process.argv[0] is node, process.argv[1] is the script path, process.argv[2] is your argument
const xmlFilePath = process.argv[2];

if (!xmlFilePath) {
  console.error('❌ Error: Please provide the path to your WordPress XML file.');
  console.error('Usage: node import.js <path-to-xml-file>');
  //node import.js wordpress-export.xml - Sample command to run in terminal
  process.exit(1);
}

// Check if the file actually exists before proceeding
if (!fs.existsSync(xmlFilePath)) {
  console.error(`❌ Error: File not found at path: "${xmlFilePath}"`);
  process.exit(1);
}

const client = createClient({
  projectId: 'p93up0zs', 
  dataset: 'production',
  useCdn: false, 
  token: 'skCg7uvoOlT1KqIbFkIyNUnzzun5je7UK5lkzm4rraX7ahKMN3J8nG5qGfXrManrmGUI81UnFzfZN5HGkSBfW9eCTgINcbnlITy21PjGDUpmQjdd8VuctKN1rw4vCTFceefLPYGpfyDWkP5qeW0Ft0kzqPYWNr6GeEbpZ7XL1ekii1Pmzhkw', 
  apiVersion: '2026-03-01'
});

async function importWordPressPosts() {
  try {
    console.log(`📖 Reading data from: ${xmlFilePath}`);
    
    // 2. Read the dynamic file path passed from bash
    const xmlData = fs.readFileSync(xmlFilePath, 'utf8');

    const parser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: false 
    });
    
    const result = parser.parse(xmlData);
    const allItems = result?.rss?.channel?.item || [];
    const posts = allItems.filter(item => item['wp:post_type'] === 'post');
    const targetPosts = posts.slice(0, 10);
    
    console.log(`Found ${posts.length} total posts. Migrating the first ${targetPosts.length}...`);

    for (const wpPost of targetPosts) {
      const title = wpPost.title;
      const slug = wpPost['wp:post_name'] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const rawHTMLContent = wpPost['content:encoded'] || '';

      const doc = {
        _type: 'blog',
        title: title,
        slug: { _type: 'slug', current: slug },
        content: rawHTMLContent 
      };

      const createdDoc = await client.create(doc);
      console.log(`✅ Successfully imported: "${title}" -> ID: ${createdDoc._id}`);
    }

    console.log('\n🎉 Finished migrating 10 posts directly to CKEditor fields!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

importWordPressPosts();
