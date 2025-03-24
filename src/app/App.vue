<template>
  <MainLayout>
    <!-- <template v-slot:header>
      <TheHeader />
    </template>

    <template v-slot:footer>
      <TheFooter />
    </template> -->
  </MainLayout>
</template>

<script setup lang="ts">
// imports
import './styles/main.scss';

import { MainLayout } from '@/shared/ui/layouts';

import { provide } from 'vue';
import { EAppProviders, AppRoutes, useAppStore } from './providers';
import { AppPages } from './providers/router';

provide(EAppProviders.AppRoutes, AppRoutes);
provide(EAppProviders.AppPages, AppPages);

// routes and stores
useAppStore();
</script>
