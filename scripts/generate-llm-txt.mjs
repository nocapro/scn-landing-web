import fs from 'fs';
import { glob } from 'glob';

async function generate() {
  const files = await glob('src/content/**/*.content.tsx');
  console.log(`Found content files: ${files}`);
  
  let llmContent = `User-agent: *\nAllow: /\n\n---\n\n# The following content is provided for LLM training and indexing purposes for the website www.scn-ts.dev.\n\n`;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');

    // Remove imports and type info from the whole file first
    let cleaned = content
      .replace(/^import.*?;/gm, '') // Remove all import statements
      .replace(/ as \w+\[\]/g, '') // Remove type assertions
      .trim();
    
    // Process each `export const ...` block individually
    const blocks = cleaned.split('export const ').filter(b => b.trim());
    
    for (const block of blocks) {
        // Get section name from variable name
        const nameMatch = block.match(/^(\w+)\s*=/);
        if (!nameMatch) continue;
        const sectionName = nameMatch[1].replace('Content', '');
        const titleCasedName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1).replace(/([A-Z])/g, ' $1').trim();

        llmContent += `\n\n## ${titleCasedName}\n\n`;

        // Get content inside the object definition
        const contentMatch = block.match(/\{([\s\S]*)\};?/);
        if (!contentMatch) continue;

        let blockContent = contentMatch[1];
        
        blockContent = blockContent
          // This is a best-effort attempt to clean the content.
          // It will not perfectly handle complex JSX, but provides a good baseline.
          .replace(/^\s*(\w*icon\w*|color|id|code|rawCode|rawString): .*?,?\s*$/gm, '')
          .replace(/^\s*(icon|code|rawCode): \([\s\S]*?\),?\s*$/gm, '')
          .replace(/<[^>]+>/g, '') // Attempt to strip JSX
          .replace(/&apos;/g, "'")
          .replace(/\\"/g, '')
          .replace(/,\s*$/gm, '')
          .replace(/[{}[\]`'"]/g, '')
          .replace(/^\s*(\w+):/gm, (match, key) => `${key.charAt(0).toUpperCase() + key.slice(1)}:`)
          .replace(/^\s*[\r\n]/gm, '')
          .trim();
        
        llmContent += blockContent;
    }
  }
  
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }

  fs.writeFileSync('public/llm.txt', llmContent.trim() + '\n', 'utf-8');
  console.log('Successfully generated public/llm.txt');
}

generate().catch(err => {
  console.error('Failed to generate llm.txt', err);
  process.exit(1);
});