import { generateRandomSuffix } from './generate-random-suffix';
import { slugfy } from './slugfy';

export function createSlugFromText(text: string) {
  const slug = slugfy(text);
  return `${slug}-${generateRandomSuffix()}`;
}
