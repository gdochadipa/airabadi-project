<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTranslations } from '../composables/useTranslations'

const props = defineProps<{ lang?: 'id' | 'en' }>()
const t = useTranslations(props.lang || 'id')

const isId = computed(() => props.lang === 'id')

const labels = computed(() => ({
  eyebrow: isId.value ? 'Kalkulator Air' : 'Water Calculator',
}))

const calcType = ref<'pool' | 'tank'>('pool')
const length = ref(10)
const width = ref(4)
const depth = ref(1.5)

const volumeLitres = computed(() =>
  Math.round(length.value * width.value * depth.value * 1000)
)

const deliveryPlan = computed(() => {
  const vol = volumeLitres.value
  if (vol <= 0) return { trucks8k: 0, trucks5k: 0, total: 0 }
  const trucks8k = Math.floor(vol / 8000)
  const remainder = vol % 8000
  if (remainder > 5000) return { trucks8k: trucks8k + 1, trucks5k: 0, total: trucks8k + 1 }
  const trucks5k = remainder > 0 ? 1 : 0
  return { trucks8k, trucks5k, total: trucks8k + trucks5k }
})

const waNumber = '6281234567890'
const whatsappUrl = computed(() => {
  const plan = deliveryPlan.value
  const locale = isId.value ? 'id-ID' : 'en-US'
  const msg = encodeURIComponent(
    isId.value
      ? `Halo AirAbadi, saya ingin memesan pengiriman air. Estimasi: ${volumeLitres.value.toLocaleString(locale)} Liter, ${plan.total} truk.`
      : `Hello AirAbadi, I'd like to book water delivery. Estimate: ${volumeLitres.value.toLocaleString(locale)} Litres, ${plan.total} trucks.`
  )
  return `https://wa.me/${waNumber}?text=${msg}`
})
</script>

<template>
  <section id="calculator" class="py-[128px] bg-white">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)]">
      <div class="max-w-3xl mx-auto rounded-[32px] backdrop-blur-md bg-white/60 border border-[#DCE8EC] p-8 md:p-12 shadow-[0_8px_36px_rgba(11,48,59,.08)]">

        <div class="text-center mb-10">
          <div class="eyebrow inline-flex items-center font-display text-[11px] font-bold tracking-[.15em] uppercase text-[#19A7CE] mb-5">
            {{ labels.eyebrow }}
          </div>
          <h2 class="text-[clamp(28px,2.8vw,42px)] text-[#0B303B] leading-[1.12] mb-3">
            {{ t('calculator.title') }}
          </h2>
          <p class="text-[15px] text-[#5C7880] max-w-md mx-auto">
            {{ t('calculator.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          <div class="space-y-6 bg-[#F6FAFB] p-6 rounded-[22px] border border-[#DCE8EC]">
            <div>
              <label class="block font-display text-[11px] font-bold tracking-[.12em] uppercase text-[#5C7880] mb-3">
                {{ t('calculator.purpose') }}
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="calcType = 'pool'"
                  :aria-pressed="calcType === 'pool'"
                  :class="calcType === 'pool'
                    ? 'bg-[#19A7CE] text-white shadow-[0_4px_16px_rgba(25,167,206,.28)]'
                    : 'bg-white text-[#0B303B] border border-[#DCE8EC] hover:border-[#19A7CE]'"
                  class="py-3 px-4 rounded-[14px] text-sm font-semibold font-display transition-all duration-200 cursor-pointer"
                >{{ t('calculator.pool') }}</button>
                <button
                  @click="calcType = 'tank'"
                  :aria-pressed="calcType === 'tank'"
                  :class="calcType === 'tank'
                    ? 'bg-[#19A7CE] text-white shadow-[0_4px_16px_rgba(25,167,206,.28)]'
                    : 'bg-white text-[#0B303B] border border-[#DCE8EC] hover:border-[#19A7CE]'"
                  class="py-3 px-4 rounded-[14px] text-sm font-semibold font-display transition-all duration-200 cursor-pointer"
                >{{ t('calculator.tank') }}</button>
              </div>
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <label for="wc-length" class="text-[13px] font-semibold text-[#0B303B] cursor-pointer">{{ t('calculator.length') }}</label>
                <span class="text-lg font-bold text-[#146C94] font-display">{{ length }}<span class="text-sm font-medium text-[#5C7880]">m</span></span>
              </div>
              <input id="wc-length" type="range" v-model.number="length" min="1" max="50" step="0.5"
                class="w-full h-2 bg-[#DCE8EC] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#19A7CE] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <label for="wc-width" class="text-[13px] font-semibold text-[#0B303B] cursor-pointer">{{ t('calculator.width') }}</label>
                <span class="text-lg font-bold text-[#146C94] font-display">{{ width }}<span class="text-sm font-medium text-[#5C7880]">m</span></span>
              </div>
              <input id="wc-width" type="range" v-model.number="width" min="1" max="25" step="0.5"
                class="w-full h-2 bg-[#DCE8EC] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#19A7CE] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <label for="wc-depth" class="text-[13px] font-semibold text-[#0B303B] cursor-pointer">{{ t('calculator.depth') }}</label>
                <span class="text-lg font-bold text-[#146C94] font-display">{{ depth }}<span class="text-sm font-medium text-[#5C7880]">m</span></span>
              </div>
              <input id="wc-depth" type="range" v-model.number="depth" min="0.5" max="4" step="0.1"
                class="w-full h-2 bg-[#DCE8EC] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#19A7CE] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>

          <div class="space-y-6 bg-gradient-to-br from-[#0B303B] to-[#146C94] text-white p-8 rounded-[22px] shadow-[0_8px_36px_rgba(11,48,59,.15)]">
            <div>
              <span class="block font-display text-[10px] font-bold tracking-[.15em] uppercase text-[#19A7CE] mb-2">{{ t('calculator.estimated') }}</span>
              <div class="text-5xl md:text-6xl font-black font-display tracking-tight">
                {{ volumeLitres.toLocaleString(isId ? 'id-ID' : 'en-US') }}
              </div>
              <span class="text-sm text-white/60 font-medium">{{ t('calculator.litres') }}</span>
            </div>

            <div class="border-t border-white/15 pt-5 space-y-3">
              <h4 class="font-display text-[10px] font-bold tracking-[.15em] uppercase text-[#19A7CE]">{{ t('calculator.fleet') }}</h4>

              <div v-if="deliveryPlan.trucks8k > 0" class="flex justify-between items-center">
                <span class="text-sm text-white/75">{{ t('calculator.truck8k') }}</span>
                <span class="text-base font-extrabold font-display bg-white/10 px-3 py-1 rounded-lg">{{ deliveryPlan.trucks8k }}&times;</span>
              </div>

              <div v-if="deliveryPlan.trucks5k > 0" class="flex justify-between items-center">
                <span class="text-sm text-white/75">{{ t('calculator.truck5k') }}</span>
                <span class="text-base font-extrabold font-display bg-white/10 px-3 py-1 rounded-lg">{{ deliveryPlan.trucks5k }}&times;</span>
              </div>

              <div class="flex justify-between items-center border-t border-white/10 pt-3">
                <span class="font-bold font-display text-white">{{ t('calculator.totalTrucks') }}</span>
                <span class="font-black font-display text-lg text-[#19A7CE]">{{ deliveryPlan.total }}</span>
              </div>
            </div>

            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold font-display text-[14.5px] py-4 rounded-full shadow-[0_4px_20px_rgba(34,197,94,.32)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {{ t('calculator.cta') }}
            </a>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
