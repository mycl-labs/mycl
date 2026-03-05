import { FeedCategory } from '../src/schema';

const categories = FeedCategory.options;
console.log('// generated category list');
for (const c of categories) console.log(`export const CATEGORY_${c.toUpperCase()} = ${JSON.stringify(c)};`);

console.log(`// generated ${categories.length} constants`);
