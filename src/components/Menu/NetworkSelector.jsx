/* eslint-disable spaced-comment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { CHAIN_INFO } from '../../constants/chaininfo'
import { SupportedChainId, CHAIN_IDS_TO_NAMES } from '../../constants/chains'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useAppDispatch } from '../../state/hooks'
import { replaceURLParam } from '../../utils/routes'
import { addPopup2, ApplicationModal } from '../../state/application/reducer'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useToggleModal } from '../../state/application/hooks'
import { switchToNetwork } from '../../utils/switchToNetwork'

const getChainNameFromId = (id) => {
  // casting here may not be right but fine to return undefined if it's not a supported chain ID
  return CHAIN_IDS_TO_NAMES[id] || ''
}


const Row = ({ targetChain, onSelectChain }) => {
  const { label, logoUrl } = CHAIN_INFO[targetChain]

  const rowContent = (
    <div className="row__content" onClick={() => onSelectChain(targetChain)}>
      <img src={logoUrl} alt="" />
      <span>{label}</span>
    </div>
  )

  return rowContent
}

const NetworkSelector = () => {
  const { chainId, library } = useActiveWeb3React()
  const [open, setOpen] = useState(false)
  const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR)
  const history = useHistory()
  const node = useRef()

  useOnClickOutside(node, open ? toggle : undefined)
  const dispatch = useAppDispatch()

  const info = chainId ? CHAIN_INFO[chainId] : undefined

  const handleChainSwitch = useCallback(
    (targetChain, skipToggle) => {
      setOpen(false)
      if (!library?.provider) return
      switchToNetwork({ provider: library.provider, chainId: targetChain })
        .then(() => {
          if (!skipToggle) {
            toggle()
          }
          history.replace({
            search: replaceURLParam(history.location.search, 'chain', getChainNameFromId(targetChain)),
          })
        })
        .catch((error) => {
          console.error('Failed to switch networks', error)

          // we want app network <-> chainId param to be in sync, so if user changes the network by changing the URL
          // but the request fails, revert the URL back to current chainId
          if (chainId) {
            history.replace({ search: replaceURLParam(history.location.search, 'chain', getChainNameFromId(chainId)) })
          }

          if (!skipToggle) {
            toggle()
          }

          dispatch(addPopup2({ content: { failedSwitchNetwork: targetChain }, key: `failed-network-switch` }))
        })
    },
    [dispatch, library, toggle, history, chainId]
  )

  return (
    <div className="network__selector">
      <div onClick={() => setOpen(!open)} className="network__selector__shown">
        <img src={info?.logoUrl} alt="" />
        <span>{info?.label || "Ethereum"}</span>
      </div>
      {open && (
        <div className="network__selector__list">
          <h3>Select a Network</h3>
          <Row targetChain={SupportedChainId.MAINNET} onSelectChain={handleChainSwitch} />
          <Row targetChain={SupportedChainId.POLYGON} onSelectChain={handleChainSwitch} />
          <Row targetChain={SupportedChainId.ARBITRUM_ONE} onSelectChain={handleChainSwitch} />
          <Row targetChain={SupportedChainId.OPTIMISM} onSelectChain={handleChainSwitch} />
        </div>
      )}
    </div>
  )
}

export default NetworkSelector
