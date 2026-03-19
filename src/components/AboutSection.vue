<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from '../composables/useTranslations'
import { ui } from '../i18n/ui'

const props = defineProps<{
  lang?: keyof typeof ui
}>()

const t = useTranslations(props.lang || 'id')

gsap.registerPlugin(ScrollTrigger)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo('.about-img',
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-img', start: 'top 88%', toggleActions: 'play none none none' } }
    )
    gsap.fromTo('.about-txt',
      { opacity: 0, x: 44 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-txt', start: 'top 88%', toggleActions: 'play none none none' } }
    )
  })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="about" class="py-[128px] bg-white">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)]">
      <div class="grid grid-cols-12 gap-7 items-start">

        <!-- Image Stack -->
        <div class="about-img col-span-12 lg:col-span-5">
          <div class="grid grid-cols-2 gap-[14px]">
            <!-- Wide block -->
            <div
              class="col-span-2 h-[264px] rounded-[22px] overflow-hidden flex items-center justify-center text-[72px] relative shadow-[0_8px_36px_rgba(11,48,59,.10)]"
              style="background: linear-gradient(135deg,#19A7CE 0%,#146C94 100%)"
            >
              🏊
              <span
                class="absolute bottom-4 left-5 text-[11px] font-bold uppercase tracking-[.10em] text-white/70 font-display"
              >{{ t('about.img.text') }}</span>
            </div>
            <!-- Small blocks -->
            <div class="h-[132px] rounded-[22px] bg-[#EAF6FB] flex items-center justify-center text-[48px]">🚛</div>
            <div class="h-[132px] rounded-[22px] bg-[#EBF5F0] flex items-center justify-center text-[48px]">💧</div>
          </div>
        </div>

        <!-- Text -->
        <div class="about-txt col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-start pt-2">
          <div class="eyebrow inline-flex items-center font-display text-[11px] font-bold tracking-[.15em] uppercase text-[#19A7CE] mb-5">
            {{ t('about.eyebrow') }}
          </div>

          <h2 class="text-[clamp(28px,2.8vw,40px)] text-[#0B303B] mb-5 leading-[1.12]">
            {{ t('about.title.pt1') }}
            <em class="text-[#19A7CE] not-italic">{{ t('about.title.em') }}</em>
          </h2>

          <p class="text-[15px] leading-[1.8] text-[#5C7880] mb-4">
            {{ t('about.desc1') }}
          </p>
          <p class="text-[15px] leading-[1.8] text-[#5C7880]">
            {{ t('about.desc2') }}
          </p>
        </div>

      </div>
    </div>
  </section>
</template>
