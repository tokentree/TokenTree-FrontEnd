import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import CloseIcon from '@mui/icons-material/Close'
import React, { useCallback, useContext, useEffect, createContext } from 'react'
import { Handler, InjectedProps } from './types'

interface Props extends InjectedProps {
  title: string
  hideCloseButton?: boolean
  onBack?: () => void
  bodyPadding?: string
  setOpen?: Handler
}

interface ModalsContext {
  onPresent: (node: React.ReactNode, key?: string) => void
  onDismiss: Handler
  setCloseOnOverlayClick: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ModalsContext>({
  onPresent: () => null,
  onDismiss: () => null,
  setCloseOnOverlayClick: () => true,
})

const Modal: React.FC<Props> = ({ title, onDismiss, onBack, children, hideCloseButton = false, setOpen }) => (
  <div className="modal__component__wrapper">
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
        {!hideCloseButton && setOpen !== undefined && (
          <button type="button" onClick={() => setOpen()} aria-label="Close the dialog">
            <CloseIcon color="primary" />
          </button>
        )}
      </div>
      <div className="modal__body">{children}</div>
    </div>
  </div>
)

export const useModal = (modal: React.ReactNode, closeOnOverlayClick = true): [Handler, Handler] => {
  const { onPresent, onDismiss, setCloseOnOverlayClick } = useContext(Context)
  const onPresentCallback = useCallback(() => {
    onPresent(modal)
  }, [modal, onPresent])

  useEffect(() => {
    setCloseOnOverlayClick(closeOnOverlayClick)
  }, [closeOnOverlayClick, setCloseOnOverlayClick])

  return [onPresentCallback, onDismiss]
}

export default Modal
