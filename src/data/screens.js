// Final screens: Hi-Fi > LOOP · IA Screen Flow (2954:20125).
// Imported assets get Vite content hashes so previous public/screens files cannot stay cached.
const screens = import.meta.glob('../assets/screens/final/*.webp', { eager: true, query: '?url', import: 'default' })
const base = import.meta.env.BASE_URL
export const screen = code => screens[`../assets/screens/final/${code}.webp`]
export const img = name => `${base}img/${name}`
