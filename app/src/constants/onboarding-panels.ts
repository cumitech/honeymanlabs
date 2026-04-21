export type OnboardingPanel = {
  readonly overline: string
  readonly title: string
  readonly subtitle: string
  readonly bullets?: readonly string[]
}

export const ONBOARDING_PANELS: readonly OnboardingPanel[] = [
  {
    overline: 'Welcome to',
    title: 'HoneyMan',
    subtitle: 'Trace every batch with confidence from hive harvest to final jar.',
  },
  {
    overline: 'Quality first',
    title: 'Assured products',
    subtitle: 'Run quality checks, verify origin, and confidently sell trusted honey products.',
    bullets: ['Lab and field quality assurance', 'Traceable origin and batch history'],
  },
  {
    overline: 'Built to scale',
    title: 'Grow smarter',
    subtitle:
      'Manage apiaries, teams, and sales with clear insights that keep operations consistent.',
  },
]
