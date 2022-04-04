/* eslint-disable spaced-comment */
import React, { useEffect, useState } from 'react'
import { useUserSlippageTolerance } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'

const MAX_SLIPPAGE = 5000
const RISKY_SLIPPAGE_LOW = 50
const RISKY_SLIPPAGE_HIGH = 500

const predefinedValues = [
  { label: '0.1%', value: 0.1 },
  { label: '0.5%', value: 0.5 },
  { label: '1%', value: 1 },
]

type SlippageToleranceSettingsModalProps = {
  translateString: (translationId: number, fallback: string) => string
}

const SlippageToleranceSettings = ({ translateString }: SlippageToleranceSettingsModalProps) => {
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [value, setValue] = useState(userSlippageTolerance / 100)
  const [error, setError] = useState<string | null>(null)
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseFloat(inputValue))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 100
      if (!Number.isNaN(rawValue) && rawValue > 0 && rawValue < MAX_SLIPPAGE) {
        setUserslippageTolerance(rawValue)
        setError(null)
      } else {
        setError(translateString(1144, 'Enter a valid slippage percentage'))
      }
    } catch {
      setError(translateString(1144, 'Enter a valid slippage percentage'))
    }
  }, [value, setError, setUserslippageTolerance, translateString])

  // Notify user if slippage is risky
  useEffect(() => {
    if (userSlippageTolerance < RISKY_SLIPPAGE_LOW) {
      setError(translateString(1146, 'Your transaction may fail'))
    } else if (userSlippageTolerance > RISKY_SLIPPAGE_HIGH) {
      setError(translateString(1148, 'Your transaction may be frontrun'))
    }
  }, [userSlippageTolerance, setError, translateString])

  return (
    <div className="settings__container">
      <div className="settings__details">
        <p>{translateString(88, 'Slippage tolerance')}</p>
        <QuestionHelper
          text={translateString(
            186,
            'Your transaction will revert if the price changes unfavorably by more than this percentage.'
          )}
        />
      </div>
      <div className="settings__options">
        {predefinedValues.map(({ label, value: predefinedValue }) => {
          const handleClick = () => setValue(predefinedValue)
          return (
            <div className="settings__option" key={predefinedValue}>
              <button type="button" onClick={handleClick}>
                {label}
              </button>
            </div>
          )
        })}
        <div>
          <div className="settings__option">
            <input
              type="number"
              //scale="lg"
              step={0.1}
              min={0.1}
              placeholder="5%"
              value={value}
              onChange={handleChange}
              //isWarning={error !== null}
            />
            <p>%</p>
          </div>
        </div>
      </div>
      {error && <p className="settings__error">{error}</p>}
    </div>
  )
}

export default SlippageToleranceSettings
