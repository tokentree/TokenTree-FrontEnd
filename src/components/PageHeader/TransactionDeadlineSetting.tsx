import React, { useEffect, useState } from 'react'
import { useUserDeadline } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'

type TransactionDeadlineSettingModalProps = {
  translateString: (translationId: number, fallback: string) => string
}

const TransactionDeadlineSetting = ({ translateString }: TransactionDeadlineSettingModalProps) => {
  const [deadline, setDeadline] = useUserDeadline()
  const [value, setValue] = useState(deadline / 60) // deadline in minutes
  const [error, setError] = useState<string | null>(null)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseInt(inputValue, 10))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 60
      if (!Number.isNaN(rawValue) && rawValue > 0) {
        setDeadline(rawValue)
        setError(null)
      } else {
        setError(translateString(1150, 'Enter a valid deadline'))
      }
    } catch {
      setError(translateString(1150, 'Enter a valid deadline'))
    }
  }, [value, setError, setDeadline, translateString])

  return (
    <div className="transaction">
      <div className="transaction__details">
        <p>{translateString(90, 'Transaction deadline')}</p>
        <QuestionHelper
          text={translateString(188, 'Your transaction will revert if it is pending for more than this long.')}
        />
      </div>
      <div className="transaction__field">
        <input type="number" step="1" min="1" value={value} onChange={handleChange} />
        <p>Minutes</p>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}

export default TransactionDeadlineSetting
