import client from './client';
import imageUrlBuilder from '@sanity/image-url';
import { Url } from 'next/dist/shared/lib/router/router';

const builder = imageUrlBuilder(client);

export function urlFor(source: Url) {
  return builder.image(source);
}
