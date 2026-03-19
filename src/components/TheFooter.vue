<script setup lang="ts">
import { computed } from 'vue'
import { useTranslations } from '../composables/useTranslations'

const props = defineProps<{ lang?: 'id' | 'en' }>()
const t = useTranslations(props.lang || 'id')

const footerLinks = computed(() => ({
  Company: [t('footer.link.about'), t('footer.link.career'), t('footer.link.blog')],
}))

const contact = computed(() => ({
  title: t('footer.contact'),
  lines: [t('footer.contact.partner'), 'info@airabadi.com', '+62 812-3456-7890'],
}))

const address = computed(() => ({
  title: t('footer.meet'),
  lines: [t('footer.meet.line1'), t('footer.meet.line2'), t('footer.meet.line3')],
}))

const socials = [
  { label: 'FB', href: '#' },
  { label: 'IG', href: '#' },
  { label: 'WA', href: 'https://wa.me/6281234567890' },
]
</script>

<template>
  <footer class="bg-[#0B303B] pt-[72px]">
    <!-- Top grid -->
    <div
      class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)] grid gap-12 pb-14 border-b border-white/[.07]"
      style="grid-template-columns: 3.5fr 1fr 1fr 1fr"
    >
      <!-- Brand -->
      <div>
        <a href="#home" class="flex items-center gap-2 font-display font-extrabold text-[20px] text-white mb-4">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="15" fill="rgba(25,167,206,.15)" />
            <path d="M15 5C15 5 8 12.5 8 17.5C8 21.09 11.13 24 15 24C18.87 24 22 21.09 22 17.5C22 12.5 15 5 15 5Z" fill="#19A7CE" />
          </svg>
          Air<span class="text-[#19A7CE]">Abadi</span>
        </a>
        <p class="text-[13.5px] leading-[1.75] text-white/42 max-w-[268px] mb-7">
          {{ t('footer.desc') }}
        </p>
        <div class="flex gap-[10px]">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            class="w-[34px] h-[34px] rounded-[8px] bg-white/[.07] flex items-center justify-center text-[11px] font-bold font-display text-white/45 hover:bg-[#19A7CE] hover:text-white transition-all duration-200"
          >
            {{ s.label }}
          </a>
        </div>
      </div>

      <!-- Company -->
      <div>
        <h5 class="font-display text-[10.5px] font-bold tracking-[.13em] uppercase text-white/32 mb-6">
          {{ t('footer.company') }}
        </h5>
        <ul class="flex flex-col gap-[13px]">
          <li v-for="link in footerLinks.Company" :key="link">
            <a href="#" class="text-[13.5px] text-white/58 hover:text-[#19A7CE] transition-colors duration-200">
              {{ link }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h5 class="font-display text-[10.5px] font-bold tracking-[.13em] uppercase text-white/32 mb-6">
          {{ contact.title }}
        </h5>
        <address class="not-italic flex flex-col gap-[6px]">
          <span
            v-for="(line, i) in contact.lines"
            :key="i"
            class="text-[13.5px] leading-[1.75] text-white/58"
          >{{ line }}</span>
        </address>
      </div>

      <!-- Meet Us -->
      <div>
        <h5 class="font-display text-[10.5px] font-bold tracking-[.13em] uppercase text-white/32 mb-6">
          {{ address.title }}
        </h5>
        <address class="not-italic flex flex-col gap-[6px]">
          <span
            v-for="(line, i) in address.lines"
            :key="i"
            class="text-[13.5px] leading-[1.75] text-white/58"
          >{{ line }}</span>
        </address>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)] py-[22px] flex items-center justify-between flex-wrap gap-3">
      <span class="text-[12.5px] text-white/28">{{ t('footer.copyright') }}</span>
      <span class="font-display text-[12px] font-semibold tracking-[.06em] text-white/22">
        {{ t('footer.tagline') }}
      </span>
    </div>
  </footer>
</template>
