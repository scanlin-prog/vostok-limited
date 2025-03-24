<template>
  <div class="container result">
    <a class="result-link" href="https://vite.dev" target="_blank">
      <BaseIcon icon="vite" />
    </a>
    <div class="result-table">
      <h2 class="result-table__title">Таблица результатов</h2>
      <ul class="result-table__list">
        <li
          v-for="(item, index) in dataList"
          :key="index"
          class="result-table__item"
        >
          <ResultCell :data="item" />
        </li>
      </ul>
      <BaseButton
        class="result__btn-back"
        :secondary="true"
        :full="true"
        @follow="followToPage"
      >
        <span>Вернуться к форме</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { BaseIcon } from '@/shared/ui/icon';
import { BaseButton } from '@/shared/ui/buttons';
import { ResultCell } from '@/entities/Cell/ui';

import { useRouter } from 'vue-router';
import { useAppRoutes, useAppStore } from '@/app/providers';

import { computed } from 'vue';

// types
type DictType = {
  [key: string]: string;
};

// vars
const dict: DictType = {
  city: 'Город',
  workshop: 'Цех',
  worker: 'Сотрудник',
  brigade: 'Бригада',
  shift: 'Смена',
};

// routes and stores
const router = useRouter();
const appRoutes = useAppRoutes();
const appStore = useAppStore();

// refs
const dataList = computed(() => {
  const result = Object.entries(appStore.formData).map((item) => {
    const newKey = dict[item[0]];
    return {
      title: newKey,
      value: item[1],
    };
  });

  return result;
});

// functions
function followToPage() {
  router.push(appRoutes.getMain());
}
</script>

<style lang="scss">
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  min-height: 100vh;
}

.result-link {
  .icon {
    @include size(60px);
  }
}

.result-table {
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}

.result-table__title {
  text-align: center;

  color: #ffc81f;
}

.result-table__list {
  @include list-reset;
  display: flex;
  flex-direction: column;
}

.result__btn-back {
  margin-top: 10px;
}
</style>
