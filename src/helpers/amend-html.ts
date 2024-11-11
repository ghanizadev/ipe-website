import * as cheerio from 'cheerio';

export default function amendHTML(html?: string): string {
  if (!html) return '';

  const $ = cheerio.load(html);
  const $video = $('a[href$=".mp4"]');

  if ($video)
    $video.replaceWith(
      `<video controls><source src="${$video.attr()?.href}"></video>`
    );
  return $.html();
}
