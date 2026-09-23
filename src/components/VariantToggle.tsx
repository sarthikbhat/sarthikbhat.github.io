import type { Variant } from '../App'

export function VariantToggle({
  variant,
  onChange,
}: {
  variant: Variant
  onChange: (v: Variant) => void
}) {
  return (
    <div className="vtoggle" role="group" aria-label="Experience variant">
      <button
        className={variant === 'forge' ? 'vtoggle-btn active' : 'vtoggle-btn'}
        aria-pressed={variant === 'forge'}
        data-cur="forge"
        onClick={() => onChange('forge')}
      >
        forge
      </button>
      <button
        className={variant === 'journey' ? 'vtoggle-btn active' : 'vtoggle-btn'}
        aria-pressed={variant === 'journey'}
        data-cur="journey"
        onClick={() => onChange('journey')}
      >
        journey
      </button>
    </div>
  )
}
