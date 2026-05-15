import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import fs from 'fs'
import path from 'path'

// Helper to extract IDs from a file using a simple regex
const extractIds = (fileName: string, pattern: RegExp): string[] => {
  try {
    const filePath = path.resolve(__dirname, `src/data/${fileName}`);
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(pattern);
    if (!matches) return [];
    return matches.map(m => m.match(/"(.*?)"/)![1]);
  } catch (e) {
    console.error(`Error extracting IDs from ${fileName}:`, e);
    return [];
  }
};

const getDynamicRoutes = () => {
  const routes: string[] = [];
  
  // Current Affairs
  const caIds = extractIds('currentAffairs.ts', /id:\s*"(202\d-\d{2}-\d{2})"/g);
  caIds.forEach(id => routes.push(`/current-affairs/${id}`));
  
  // Monthly Magazines
  const magIds = extractIds('monthlyMagazines.ts', /id:\s*"(.*?)"/g);
  magIds.forEach(id => routes.push(`/monthly-magazines/${id}`));
  
  // Courses
  const courseIds = extractIds('courses.ts', /id:\s*"(.*?)"/g);
  courseIds.forEach(id => routes.push(`/courses/${id}`));

  return routes;
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://netiacademy.com',
      dynamicRoutes: [
        '/',
        '/current-affairs',
        '/study-materials',
        '/blogs',
        '/courses',
        '/contact',
        '/monthly-magazines',
        ...getDynamicRoutes()
      ],
    }),
  ],
  server: {
    port: 5174,
  },
})
