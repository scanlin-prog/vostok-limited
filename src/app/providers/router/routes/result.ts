import type { RouteRecordRaw } from 'vue-router';

export const routeName = 'ResultPage';

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/result',
  component: () => import('@/pages/result'),
};
