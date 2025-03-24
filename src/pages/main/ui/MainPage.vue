<template>
  <div class="container main">
    <a class="main-link" href="https://vuejs.org/" target="_blank">
      <BaseIcon icon="vue" />
    </a>
    <div class="main-form-wrap">
      <h2 class="main-form-title">Форма заполнения данных</h2>
      <BaseForm
        class="main-form"
        submit-text="Сохранить"
        :validation-schema="validationSchema"
        @submit="onSubmit"
      >
        <BaseSelect
          v-model="formData.city"
          :list="cities"
          :schema="schemaCities"
        />
        <BaseSelect
          v-model="formData.workshop"
          :list="workshops"
          :schema="schemaWorkshops"
          :disabled="formData.city === ''"
        />
        <BaseSelect
          v-model="formData.worker"
          :list="workers"
          :schema="schemaWorkers"
          :disabled="formData.workshop === ''"
        />
        <BaseSelect
          v-model="formData.brigade"
          :list="brigades"
          :schema="schemaBrigades"
        />
        <BaseSelect
          v-model="formData.shift"
          :list="shifts"
          :schema="schemaShifts"
        />

        <template #additional-buttons>
          <BaseButton :secondary="true" :full="true" @follow="followToResult">
            <span>К таблице результатов</span>
          </BaseButton>
        </template>
      </BaseForm>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import { BaseIcon } from '@/shared/ui/icon';
import { BaseForm } from '@/shared/ui/form';
import { BaseSelect } from '@/shared/ui/form';
import { BaseButton } from '@/shared/ui/buttons';

import { useRouter } from 'vue-router';
import { useAppRoutes, useAppStore } from '@/app/providers';

import { onMounted, ref, watch } from 'vue';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

import type { SelectItem } from '@/shared/ui/form';

// vars
const schemaCities = {
  name: 'cities',
  label: 'Город',
  placeholder: 'Выберите город',
};

const schemaWorkshops = {
  name: 'workshops',
  label: 'Цех (сначала выберите город)',
  placeholder: 'Выберите цех',
};

const schemaWorkers = {
  name: 'workers',
  label: 'Сотрудник (сначала выберите цех)',
  placeholder: 'Выберите сотрудника',
};

const schemaBrigades = {
  name: 'brigades',
  label: 'Бригада',
  placeholder: 'Выберите бригаду',
};

const schemaShifts = {
  name: 'shifts',
  label: 'Смена',
  placeholder: 'Выберите смену',
};

// routes and stores
const router = useRouter();
const appRoutes = useAppRoutes();
const appStore = useAppStore();

// refs
const formData = ref({
  city: '',
  workshop: '',
  worker: '',
  brigade: '',
  shift: '',
});

const cities = ref<SelectItem[]>([]);
const workshops = ref<SelectItem[]>([]);
const workers = ref<SelectItem[]>([]);
const brigades = ref<SelectItem[]>([]);
const shifts = ref<SelectItem[]>([]);

// watchers
watch(
  () => formData.value.city,
  (newValue) => {
    if (newValue != '') {
      const currentWorkshops = appStore.getWorkshops(newValue);
      if (currentWorkshops) {
        workshops.value = currentWorkshops;
      }
    }
  },
  { deep: true },
);

watch(
  () => formData.value.workshop,
  (newValue) => {
    if (newValue != '') {
      const currentWorkers = appStore.getWorkers(newValue);
      if (currentWorkers) {
        workers.value = currentWorkers;
      }
    }
  },
  { deep: true },
);

const validationSchema = toTypedSchema(
  yup.object().shape({
    cities: yup.string().required('Обязательно к заполнению'),
    workshops: yup.string().required('Обязательно к заполнению'),
    workers: yup.string().required('Обязательно к заполнению'),
    brigades: yup.string().required('Обязательно к заполнению'),
    shifts: yup.string().required('Обязательно к заполнению'),
  }),
);

// functions
function followToResult() {
  router.push(appRoutes.getResult());
}

const onSubmit = async () => {
  try {
    appStore.uploadData(formData.value);

    followToResult();
  } catch {
    console.log('error submit');
  }
};

onMounted(() => {
  const data = appStore.getData();

  cities.value = data.cities;
  brigades.value = data.brigades;
  shifts.value = data.shifts;
});
</script>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  min-height: 100vh;
}

.main-link {
  .icon {
    @include size(60px);
  }
}

.main-form-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
}

.main-form-title {
  text-align: center;

  color: #41b883;
}

.main-form {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}
</style>
