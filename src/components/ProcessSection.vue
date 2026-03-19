<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from '../composables/useTranslations'

const props = defineProps<{ lang?: 'id' | 'en' }>()
const t = useTranslations(props.lang || 'id')

gsap.registerPlugin(ScrollTrigger)

const steps = computed(() => [
  {
    num: '01',
    icon: '📩',
    title: t('process.step1.title'),
    desc: t('process.step1.desc'),
  },
  {
    num: '02',
    icon: '📋',
    title: t('process.step2.title'),
    desc: t('process.step2.desc'),
  },
  {
    num: '03',
    icon: '🚛',
    title: t('process.step3.title'),
    desc: t('process.step3.desc'),
  },
])

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo('.process-hd',
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-hd', start: 'top 88%', toggleActions: 'play none none none' } }
    )
    document.querySelectorAll('.process-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 56 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          delay: i * 0.14,
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' } }
      )
    })
  })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="process" class="py-[128px] bg-[#F6FAFB]">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)]">
      <div class="grid grid-cols-12 gap-7">

        <!-- Header -->
        <div class="process-hd col-span-12 lg:col-span-6 mb-2">
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
            class="process-card relative bg-white border border-[#DCE8EC] rounded-[22px] p-10 transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_8px_36px_rgba(11,48,59,.10)] overflow-hidden"
          >
            <!-- Step label -->
            <div class="flex items-center gap-3 font-display text-[10.5px] font-extrabold tracking-[.16em] uppercase text-[#19A7CE] mb-6">
              {{ step.num }}
              <span class="flex-1 h-px bg-[#DCE8EC]" />
            </div>
            <!-- Icon -->
            <div class="w-[52px] h-[52px] rounded-[14px] bg-[#EAF6FB] flex items-center justify-center text-[24px] mb-5">
              {{ step.icon }}
            </div>
            <h3 class="text-[18px] font-bold text-[#0B303B] mb-3 font-display">{{ step.title }}</h3>
            <p class="text-[14px] leading-[1.75] text-[#5C7880]">{{ step.desc }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
