import React, { useState } from 'react'

interface Props {
  toCopy: string
}

const CopyToClipboard: React.FC<Props> = ({ toCopy, children, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)

  return (
    <button
      type="button"
      onClick={() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(toCopy)
          setIsTooltipDisplayed(true)
          setTimeout(() => {
            setIsTooltipDisplayed(false)
          }, 1000)
        }
      }}
      {...props}
    >
      {children}
      {isTooltipDisplayed && <span>Copied</span>}
    </button>
  )
}

export default CopyToClipboard
