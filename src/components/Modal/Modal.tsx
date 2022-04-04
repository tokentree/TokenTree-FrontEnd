import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import CloseIcon from '@mui/icons-material/Close'
import { InjectedProps } from './types'

interface Props extends InjectedProps {
  title: string
  hideCloseButton?: boolean
  onBack?: () => void
  bodyPadding?: string
}

const Modal: React.FC<Props> = ({ title, onDismiss, onBack, children, hideCloseButton = false }) => (
  <div className="modal__component">
    <div className="modal__header">
      <div className="modal__title">
        {onBack && (
          <button type="button" onClick={onBack}>
            <ArrowBackIosIcon color="primary" />
          </button>
        )}
        <h2>{title}</h2>
      </div>
      {!hideCloseButton && (
        <button type="button" onClick={onDismiss} aria-label="Close the dialog">
          <CloseIcon color="primary" />
        </button>
      )}
    </div>
    <div className="modal__body">{children}</div>
  </div>
)

export default Modal
