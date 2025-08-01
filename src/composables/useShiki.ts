import type { HighlighterCore } from 'shiki'
import { createJavaScriptRegexEngine } from 'shiki'
import { createHighlighterCore } from 'shiki/core'
import { isDark } from '~/composables/dark'

type Lang = 'vue' | 'typescript' | 'javascript' | 'html' | 'css'

export const shiki = shallowRef<HighlighterCore>()

createHighlighterCore({
  themes: [
    import('@shikijs/themes/vitesse-dark'),
    import('@shikijs/themes/vitesse-light'),
  ],
  langs: [
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/javascript'),
    import('@shikijs/langs/vue'),
    import('@shikijs/langs/html'),
    import('@shikijs/langs/css'),
  ],
  engine: createJavaScriptRegexEngine(),
}).then((highlighter) => {
  shiki.value = highlighter
})

function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;')
}

export function useHighlighter(code: string, lang: Lang = 'javascript') {
  return computed(() => {
    if (!shiki.value)
      return sanitizeHtml(code)

    return shiki.value?.codeToHtml(code, {
      lang,
      theme: isDark.value ? 'vitesse-dark' : 'vitesse-light',
      transformers: [
        {
          pre: (node) => {
            node.properties.style = ''
          },
        },
      ],

    })
  })
}

export const Shiki = defineComponent(
  {
    props: {
      code: {
        required: true,
      },
      lang: {
        required: true,
      },
    },
    setup(props: {
      code: string
      lang: Lang
    }) {
      const highlighted = computed(() => {
        const highlightedCode = useHighlighter(props.code, props.lang)
        return highlightedCode.value
      })

      return () => h('span', {
        innerHTML: highlighted.value,
        border: '1px solid #aaaaaa70',
        rounded: 'lg',
        p: 6,
      })
    },
  },
)
