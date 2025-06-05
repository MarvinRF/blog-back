export function parseCorsWhiteList(raw: string): string[] {
  return raw
    .split(/\/s+/g)
    .map(url => url.replace(/\/+$/, ''))
    .filter(Boolean);
}
