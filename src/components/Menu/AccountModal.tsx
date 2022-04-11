import React from 'react'
import Modal from '../Modal/Modal'
import CopyToClipboard from './CopyToClipboard'
import { connectorLocalStorageKey } from './config'

interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
  setOpen: () => void
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null, setOpen }) => (
  <Modal title="Your wallet" onDismiss={onDismiss} setOpen={setOpen}>
    <div className="account__modal__component">
      <p className="account__modal__account">{account}</p>
      <div className="account__modal__copy">
        <a href={`https://bscscan.com/address/${account}`}>View on BscScan</a>
        <CopyToClipboard toCopy={account}>Copy Address</CopyToClipboard>
      </div>
      <div className="account__modal__button">
        <button
          type="button"
          onClick={() => {
            logout()
            window.localStorage.removeItem(connectorLocalStorageKey)
            onDismiss()
            setOpen()
          }}
        >
          Logout
        </button>
      </div>
    </div>
  </Modal>
)

export default AccountModal
