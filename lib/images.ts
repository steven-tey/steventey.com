export async function getBlurDataURL(url: string | null) {
  if (!url) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
  if (url.startsWith("/images/")) {
    url = `https://steventey.com${url}`;
  }
  try {
    const response = await fetch(`https://wsrv.nl/?url=${url}&w=10&h=10`);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
}

export function getImages(urls: string[]) {
  return Promise.all(
    urls.map(async (url) => ({
      url,
      blurDataURL: await getBlurDataURL(url),
    }))
  );
}
