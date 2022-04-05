/* eslint-disable react/jsx-filename-extension */
/* eslint-disable spaced-comment */
import React from 'react'
import Modal from '../Modal/Modal'
import config, { connectorLocalStorageKey, connectors } from './config'
import { Login, Config } from './types'

//interface Props {
//  login: Login
//  onDismiss?: () => void
//}
//interface Props2 {
//  walletConfig: Config
//  login: Login
//  mb: string
//  onDismiss: () => void
//}

const WalletCard = ({ login, walletConfig, onDismiss, setOpen }) => {
  const { title, icon: Icon } = walletConfig
  return (
    <button
      className="connect__modal__button"
      onClick={() => {
        login(walletConfig.connectorId)
        window.localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId)
        onDismiss()
        setOpen()
      }}
      type="button"
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <p>{title}</p>
      <Icon />
    </button>
  )
}

const ConnectModal = ({ login, onDismiss = () => null, setOpen }) => (
  <Modal title="Connect to a wallet" onDismiss={onDismiss} setOpen={setOpen}>
    {connectors.map((entry, index) => (
      <WalletCard
        key={entry.title}
        login={login}
        walletConfig={entry}
        onDismiss={onDismiss}
        mb={index < config.length - 1 ? '8px' : '0'}
        setOpen={setOpen}
      />
    ))}
    <a
      href="https://docs.pancakeswap.finance/guides/faq#how-do-i-set-up-my-wallet-on-binance-smart-chain"
      className="connect__modal__link"
    >
      Learn how to connect
    </a>
  </Modal>
)

export default ConnectModal
