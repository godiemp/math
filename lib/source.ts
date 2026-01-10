import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/curriculum/m1/docs',
  source: docs.toFumadocsSource(),
});
