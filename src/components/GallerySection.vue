<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from '../composables/useTranslations'

const props = defineProps<{ lang?: 'id' | 'en' }>()
const t = useTranslations(props.lang || 'id')

gsap.registerPlugin(ScrollTrigger)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo('.gal-hd',
      { opacity: 0, x: -44 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.gal-hd', start: 'top 88%', toggleActions: 'play none none none' } }
    )
    gsap.fromTo('.gal-tiles',
      { opacity: 0, x: 44 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.gal-tiles', start: 'top 88%', toggleActions: 'play none none none' } }
    )
  })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section class="py-[128px] bg-[#F6FAFB]">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)]">
      <div class="grid grid-cols-12 gap-7 items-start">

        <!-- Text side -->
        <div class="gal-hd col-span-12 lg:col-span-5 pr-8">
          <div class="eyebrow inline-flex items-center font-display text-[11px] font-bold tracking-[.15em] uppercase text-[#19A7CE] mb-5">
            {{ t('gallery.eyebrow') }}
          </div>
          <h2 class="text-[clamp(28px,2.8vw,40px)] text-[#0B303B] mb-5 leading-[1.12]">
            {{ t('gallery.title.pt1') }}
            <em class="text-[#19A7CE] not-italic">{{ t('gallery.title.em') }}</em>
          </h2>
          <p class="text-[15px] leading-[1.75] text-[#5C7880] mb-8">
            {{ t('gallery.desc') }}
          </p>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 bg-[#19A7CE] text-white font-bold font-display text-[14.5px] px-7 py-[13px] rounded-full shadow-[0_4px_20px_rgba(25,167,206,.30)] hover:bg-[#146C94] hover:-translate-y-0.5 transition-all duration-200"
          >
            {{ t('gallery.cta') }}
          </a>
        </div>

        <!-- Tile grid -->
        <div
          class="gal-tiles col-span-12 lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-[14px]"
          style="grid-template-rows: 240px 240px"
        >
          <!-- Tall tile -->
          <div
            class="row-span-2 rounded-[22px] overflow-hidden flex items-center justify-center text-[80px] relative transition-transform duration-300 hover:scale-[1.02]"
            style="background: linear-gradient(145deg,#19A7CE 0%,#146C94 100%)"
          >
            🚛
            <span
              class="absolute bottom-[14px] left-[14px] font-display text-[11px] font-bold tracking-[.10em] uppercase text-white bg-[rgba(11,48,59,.26)] backdrop-blur-md px-3 py-[5px] rounded-full"
            >{{ t('gallery.badge.fleet') }}</span>
          </div>

          <div
            class="rounded-[22px] overflow-hidden flex items-center justify-center text-[52px] relative transition-transform duration-300 hover:scale-[1.02] bg-[#EAF6FB]"
          >
            💧
            <span
              class="absolute bottom-[14px] left-[14px] font-display text-[11px] font-bold tracking-[.10em] uppercase text-[#0B303B] bg-white/55 backdrop-blur-md px-3 py-[5px] rounded-full"
            >{{ t('gallery.badge.water') }}</span>
          </div>

          <div
            class="rounded-[22px] overflow-hidden flex items-center justify-center text-[52px] relative transition-transform duration-300 hover:scale-[1.02]"
            style="background: linear-gradient(145deg,#EBF5F0 0%,#C8E6DA 100%)"
          >
            🏡
            <span
              class="absolute bottom-[14px] left-[14px] font-display text-[11px] font-bold tracking-[.10em] uppercase text-[#0B303B] bg-white/55 backdrop-blur-md px-3 py-[5px] rounded-full"
            >{{ t('gallery.badge.location') }}</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
