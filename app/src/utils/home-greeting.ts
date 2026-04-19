export function homeSalutation(): 'Good morning' | 'Good afternoon' | 'Good evening' {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

/** First name, or a sensible fallback from profile / email. */
export function homeGreetingDisplayName(input: {
  firstname?: string | null
  lastname?: string | null
  email?: string | null
}): string {
  const first = input.firstname?.trim()
  if (first) return first
  const last = input.lastname?.trim()
  if (last) return last
  const email = input.email?.trim()
  if (email?.includes('@')) {
    const local = email.split('@')[0]?.trim()
    if (local) return local.charAt(0).toUpperCase() + local.slice(1)
  }
  return 'there'
}
