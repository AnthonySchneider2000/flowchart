interface NodeConnectionProps {
  direction: 'down' | 'up'
}

export function NodeConnection({ direction }: NodeConnectionProps) {
  return (
    <div className="flex justify-center w-full">
      <div className={`h-8 w-px bg-border ${direction === 'up' ? '-mt-4' : '-mb-4'}`} />
    </div>
  )
}