<template>
  <div class="word slected">{{ props.word }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  startTime: Number,
  duration: Number,
  currentTime: Number,
  word: String,
});
</script>
<style lang="less" scoped>
.word {
  text-align: center;
}
.selected {
  font-weight: 600;
}
</style>
