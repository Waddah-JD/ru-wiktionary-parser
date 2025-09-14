async function getWebpageHtmlContent(page: string): Promise<string> {
  const url = `https://ru.wiktionary.org/wiki/${encodeURIComponent(page)}`;
  console.log(url);
  const response = await fetch(url);
  return await response.text();
}

export default getWebpageHtmlContent;
