<template>
  <div v-if="options" class="flex gap-x-1">
    <button v-for="option in options"
      :class="[$style.button, { [$style.selected]: option.isSelected }]"
      @click="option.select" type="button">{{ t(option.text) }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ItemRarity, ParsedItem } from '@/parser'
import { StatFilter, ItemHasEmptyModifier } from './interfaces'

export default defineComponent({
  props: {
    filter: {
      type: Object as PropType<StatFilter>,
      required: true
    },
    item: {
      type: Object as PropType<ParsedItem>,
      required: true
    }
  },
  setup (props) {
    function select (value: ItemHasEmptyModifier) {
      const { filter } = props
      filter.option!.value = value
      filter.disabled = false
    }

    const options = computed(() => {
      const { filter } = props
      if (filter.tradeId[0] !== 'item.has_empty_modifier') return null

      return ([
        [ItemHasEmptyModifier.Any, 'item.has_empty_affix'],
        [ItemHasEmptyModifier.Prefix, 'item.has_empty_prefix'],
        [ItemHasEmptyModifier.Suffix, 'item.has_empty_suffix']
      ] as const)
        .filter(([value]) => {
          // the opposite slot searches for items unlike this one, so it is
          // never the right answer
          if (value === filter.option!.value) return true
          // widening to any slot is only worth offering on a rare, which has
          // six of them; a flask holds one prefix and one suffix, so "any"
          // says little more than naming the open slot outright
          return value === ItemHasEmptyModifier.Any &&
            props.item.rarity === ItemRarity.Rare
        })
        .map(([value, text]) => ({
          text,
          select: () => select(value),
          isSelected: (filter.option!.value === value)
        }))
    })

    const { t } = useI18n()
    return { t, options }
  }
})
</script>

<style lang="postcss" module>
.button {
  @apply bg-gray-700;
  @apply rounded;
  @apply px-2;
  @apply border border-transparent;
  line-height: 1.15rem;
}

.selected {
  @apply border-gray-500;
}
</style>
