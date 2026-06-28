<script setup lang="ts">
import { ref } from 'vue'
import { useTranslations } from '../composables/useTranslations'
import { useScrollAnimations } from '../composables/useScrollAnimations'

const props = defineProps<{ lang?: 'id' | 'en' }>()
const t = useTranslations(props.lang || 'id')

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimations(sectionRef)
</script>

<template>
  <section id="gallery" ref="sectionRef" class="py-[128px] bg-[#F6FAFB]">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)]">
      <div class="grid grid-cols-12 gap-7 items-start">

        <!-- Text side -->
        <div class="gal-hd col-span-12 lg:col-span-5 pr-8 anim-fade-left">
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
          class="gal-tiles col-span-12 lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-[14px] anim-fade-right"
          style="grid-template-rows: 240px 240px"
        >
          <!-- Tall tile -->
          <div
            class="row-span-2 rounded-[22px] overflow-hidden relative transition-transform duration-300 hover:scale-[1.02]"
            style="background: linear-gradient(145deg,#19A7CE 0%,#146C94 100%)"
          >
            <img
              src="https://images.unsplash.com/photo-1601584115195-04f3e0d5f5de?auto=format&fit=crop&w=600&q=80"
              alt=""
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-[#0B303B]/20"></div>
            <span
              class="absolute bottom-[14px] left-[14px] font-display text-[11px] font-bold tracking-[.10em] uppercase text-white bg-[rgba(11,48,59,.26)] backdrop-blur-md px-3 py-[5px] rounded-full"
            >{{ t('gallery.badge.fleet') }}</span>
          </div>

          <div
            class="rounded-[22px] overflow-hidden relative transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=400&q=80"
              alt=""
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-[#0B303B]/20"></div>
            <span
              class="absolute bottom-[14px] left-[14px] font-display text-[11px] font-bold tracking-[.10em] uppercase text-white bg-[rgba(11,48,59,.26)] backdrop-blur-md px-3 py-[5px] rounded-full"
            >{{ t('gallery.badge.water') }}</span>
          </div>

          <div
            class="rounded-[22px] overflow-hidden relative transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80"
              alt=""
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-[#0B303B]/20"></div>
            <span
              class="absolute bottom-[14px] left-[14px] font-display text-[11px] font-bold tracking-[.10em] uppercase text-white bg-[rgba(11,48,59,.26)] backdrop-blur-md px-3 py-[5px] rounded-full"
            >{{ t('gallery.badge.location') }}</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
