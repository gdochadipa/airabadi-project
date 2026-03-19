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
    gsap.fromTo('.cta-block',
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-block', start: 'top 88%', toggleActions: 'play none none none' } }
    )
  })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="contact" class="py-[128px] bg-white">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)]">

      <div
        class="cta-block relative overflow-hidden rounded-[32px] py-[92px] px-[clamp(28px,6vw,80px)] text-center"
        style="background: linear-gradient(145deg,#0B303B 0%,#0f2535 100%)"
      >
        <!-- Glow blobs -->
        <div
          class="absolute -top-[140px] -right-[140px] w-[480px] h-[480px] rounded-full pointer-events-none"
          style="background: radial-gradient(circle,rgba(25,167,206,.16) 0%,transparent 60%)"
        />
        <div
          class="absolute -bottom-[80px] -left-[80px] w-[320px] h-[320px] rounded-full pointer-events-none"
          style="background: radial-gradient(circle,rgba(25,167,206,.10) 0%,transparent 60%)"
        />

        <div class="relative z-10">
          <div class="inline-flex items-center justify-center gap-2 font-display text-[11px] font-bold tracking-[.15em] uppercase mb-5" style="color: rgba(25,167,206,.85)">
            <span class="w-[22px] h-[2px] rounded inline-block" style="background: rgba(25,167,206,.55)" />
            {{ t('contact.eyebrow') }}
            <span class="w-[22px] h-[2px] rounded inline-block" style="background: rgba(25,167,206,.55)" />
          </div>

          <h2 class="text-[clamp(28px,3.2vw,46px)] text-white mb-5 leading-[1.12]">
            {{ t('contact.title.pt1') }}<br />{{ t('contact.title.pt2') }}
          </h2>

          <p class="text-[16px] text-white/58 max-w-[500px] mx-auto mb-11 leading-[1.75]">
            {{ t('contact.desc') }}
          </p>

          <div class="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/6281234567890"
              class="inline-flex items-center gap-[10px] bg-[#22C55E] text-white font-bold font-display text-[14.5px] px-7 py-[13px] rounded-full shadow-[0_4px_20px_rgba(34,197,94,.32)] hover:bg-[#16a34a] hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {{ t('contact.wa') }}
            </a>
            <a
              href="tel:+6281234567890"
              class="inline-flex items-center gap-2 text-white font-semibold font-display text-[14.5px] px-7 py-[13px] rounded-full border-[1.5px] hover:border-[#19A7CE] hover:bg-[rgba(25,167,206,.12)] hover:-translate-y-0.5 transition-all duration-200"
              style="border-color: rgba(255,255,255,.22)"
            >
              📞 +62 812-3456-7890
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
