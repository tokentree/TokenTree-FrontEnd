/* eslint-disable react/jsx-filename-extension */
/* eslint-disable spaced-comment */
import React from 'react'
import Modal from '../Modal/Modal'
import SlippageToleranceSetting from './SlippageToleranceSetting'
import TransactionDeadlineSetting from './TransactionDeadlineSetting'

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SettingsModal = ({ onDismiss = defaultOnDismiss, translateString }) => {
  return (
    <Modal title={translateString(1200, 'Settings')} onDismiss={onDismiss} setOpen={onDismiss}>
      <SlippageToleranceSetting translateString={translateString} />
      <TransactionDeadlineSetting translateString={translateString} />
    </Modal>
  )
}

export default SettingsModal
