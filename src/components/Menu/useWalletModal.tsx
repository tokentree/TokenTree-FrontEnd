import React from 'react'
import { useModal } from '../Modal/Modal'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'
import { Login } from './types'

interface ReturnType {
  onPresentConnectModal: () => void
  onPresentAccountModal: () => void
}

const useWalletModal = (login: Login, logout: () => void, account?: string): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} setOpen="" />)
  const [onPresentAccountModal] = useModal(<AccountModal account={account || ''} logout={logout} setOpen={() => ''} />)
  return { onPresentConnectModal, onPresentAccountModal }
}

export default useWalletModal
