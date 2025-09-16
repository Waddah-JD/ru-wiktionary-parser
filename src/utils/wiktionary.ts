async function getWebpageHtmlContent(page: string): Promise<string> {
  const url = `https://en.wiktionary.org/wiki/${encodeURIComponent(page)}`;
  const response = await fetch(url);
  return await response.text();
}

export default getWebpageHtmlContent;
