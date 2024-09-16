import { unified } from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';

export async function markdownToHtml(markdownString) {
  const file = await unified()
    .use(markdown)
    .use(html)
    .process(markdownString);

  return file.toString();
}
