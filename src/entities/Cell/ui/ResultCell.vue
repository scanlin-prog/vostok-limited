<template>
  <div class="cell">
    <p class="cell__title">{{ title }}</p>
    <p class="cell__value">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
// imports
import { ref } from 'vue';
import type { PropType } from 'vue';

// types
interface ICellData {
  title: string;
  value: string;
}

// props
const props = defineProps({
  data: {
    type: Object as PropType<ICellData>,
    required: true,
  },
});

// refs
const title = ref(props.data.title);
const value = ref(props.data.value);
</script>

<style lang="scss">
.cell {
  display: flex;
}

.cell__title,
.cell__value {
  padding: 10px 12px;

  color: $white;
  border: 1px solid $grey;
}

.cell__title {
  flex: 1;
}

.cell__value {
  flex: 2;

  color: $secondary;
}
</style>
