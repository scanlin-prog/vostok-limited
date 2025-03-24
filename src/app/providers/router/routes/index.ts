import type { RouteRecordRaw } from 'vue-router';

import { route as mainRoute } from './main';
import { route as resultRoute } from './result';

export const routes: readonly RouteRecordRaw[] = [
  mainRoute,
  resultRoute,
] as const;
