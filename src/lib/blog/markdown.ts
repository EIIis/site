import { remark } from "remark";
import html from "remark-html";

export function renderMarkdownToHtml(markdown: string): string {
  return remark()
    .use(html, { sanitize: true })
    .processSync(markdown)
    .toString();
}

