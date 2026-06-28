<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTranslations } from '../composables/useTranslations'
import { useScrollAnimations } from '../composables/useScrollAnimations'

const props = defineProps<{ lang?: 'id' | 'en' }>()
const t = useTranslations(props.lang || 'id')

const steps = computed(() => [
  {
    num: '01',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80',
    title: t('process.step1.title'),
    desc: t('process.step1.desc'),
  },
  {
    num: '02',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=400&q=80',
    title: t('process.step2.title'),
    desc: t('process.step2.desc'),
  },
  {
    num: '03',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=400&q=80',
    title: t('process.step3.title'),
    desc: t('process.step3.desc'),
  },
])

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimations(sectionRef)
</script>

<template>
  <section id="process" ref="sectionRef" class="py-[128px] bg-[#F6FAFB]">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)]">
      <div class="grid grid-cols-12 gap-7">

        <!-- Header -->
        <div class="process-hd col-span-12 lg:col-span-6 mb-2 anim-fade-up">
          <div class="eyebrow inline-flex items-center font-display text-[11px] font-bold tracking-[.15em] uppercase text-[#19A7CE] mb-5">
            {{ t('process.eyebrow') }}
          </div>
          <h2 class="text-[clamp(28px,2.8vw,40px)] text-[#0B303B] mb-4 leading-[1.12]">
            {{ t('process.title.pt1') }}<br />{{ t('process.title.pt2') }}
          </h2>
          <p class="text-[15px] leading-[1.75] text-[#5C7880] max-w-[380px]">
            {{ t('process.desc') }}
          </p>
        </div>

        <!-- Cards -->
        <div class="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
            v-for="step in steps"
            :key="step.num"
            class="process-card group relative bg-white border border-[#DCE8EC] rounded-[24px] p-8 lg:p-10 transition-all duration-500 hover:-translate-y-[8px] hover:shadow-[0_24px_48px_-12px_rgba(11,48,59,.12)] overflow-hidden anim-fade-up"
          >
            <!-- Step label -->
            <div class="flex items-center gap-4 font-display text-[11px] font-bold tracking-[.18em] uppercase text-[#19A7CE] mb-8">
              <span>{{ step.num }}</span>
              <span class="flex-1 h-px bg-[#DCE8EC] transition-colors duration-500 group-hover:bg-[#19A7CE]/30" />
            </div>
            
            <!-- Real Image "Icon" -->
            <div class="relative w-[88px] h-[88px] mb-8 rounded-[24px] overflow-hidden shadow-sm ring-1 ring-[#0B303B]/5 transform-gpu transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-md">
              <img 
                :src="step.image" 
                :alt="step.title" 
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]" 
              />
            </div>
            
            <h3 class="text-[20px] font-bold text-[#0B303B] mb-3 font-display transition-colors duration-300">{{ step.title }}</h3>
            <p class="text-[15px] leading-[1.7] text-[#5C7880]">{{ step.desc }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
