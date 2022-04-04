/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable spaced-comment */
import React from 'react'
import { ButtonProps, useWalletModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useAuth from 'hooks/useAuth'
import './index.css'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <button
      onClick={onPresentConnectModal}
      onMouseEnter={() => console.log('here')}
      {...props}
      className="connect__button"
    >
      {TranslateString(292, 'Unlock Wallet')}
    </button>
  )
}

export default UnlockButton
