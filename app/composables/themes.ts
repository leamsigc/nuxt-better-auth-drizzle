export interface Theme {
  id: string
  name: string
  value: string
  description: string
}

export function useThemes() {
  const themes = ref<Theme[]>([
    {
      id: 'light',
      name: 'Light',
      value: 'light',
      description: 'Clean and bright theme perfect for day time use'
    },
    {
      id: 'dark',
      name: 'Dark',
      value: 'dark',
      description: 'Easy on the eyes, perfect for night time use'
    },
    {
      id: 'gold',
      name: 'Gold',
      value: 'gold',
      description: 'Premium theme with golden accents'
    }
  ])

  const getThemes = () => {
    return themes.value
  }

  return {
    themes,
    getThemes
  }
}
