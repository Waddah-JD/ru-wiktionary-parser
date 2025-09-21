export async function getWebpageHtmlContent(page: string): Promise<string> {
  const url = `https://en.wiktionary.org/wiki/${encodeURIComponent(page)}`;
  const response = await fetch(url);
  return await response.text();
}

export function getAccentedWord(doc: Document): string {
  const accented = doc.querySelector("strong.Cyrl.headword[lang='ru']")?.textContent?.trim();
  if (!accented) throw new Error(`Couldn't get accented word`);
  return accented;
}
