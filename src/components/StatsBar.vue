<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTranslations } from '../composables/useTranslations'
import { useScrollAnimations } from '../composables/useScrollAnimations'

const props = defineProps<{ lang?: 'id' | 'en' }>()
const t = useTranslations(props.lang || 'id')

const stats = computed(() => [
  { value: 7,  suffix: '+', label: t('stats.years') },
  { value: 95, suffix: '%', label: t('stats.reviews') },
  { value: 2,  suffix: '',  label: t('stats.trucks') },
  { value: 1000,  suffix: '+',  label: t('stats.customers') },
])

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimations(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="bg-white border-t border-b border-[#DCE8EC]">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)] grid grid-cols-4">
      <div
        v-for="(stat, i) in stats"
        :key="i"
        class="stat-item py-[52px] text-center relative anim-fade-up"
        :class="i > 0 ? 'before:absolute before:left-0 before:top-[28%] before:h-[44%] before:w-px before:bg-[#DCE8EC]' : ''"
      >
        <div
          class="font-display font-black text-[#0B303B] leading-none mb-3"
          style="font-size: clamp(40px, 3.8vw, 52px)"
          :data-count="stat.value"
          :data-suffix="stat.suffix"
        >
          {{ stat.value }}{{ stat.suffix }}
        </div>
        <div class="text-[13px] text-[#5C7880] font-medium">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>
