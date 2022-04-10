/* eslint-disable spaced-comment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import GrainIcon from '@mui/icons-material/Grain';
import ListIcon from '@mui/icons-material/List'
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

const Row = ({ targetChain, onSelectChain, name }) => {
  const { label, logoUrl } = CHAIN_INFO[targetChain]

  const rowContent = (
    <div className="row__content" onClick={() => onSelectChain(targetChain)}>
      <img src={logoUrl} alt="" />
      <span>{name}</span>
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
        {info?.logoUrl ? <img src={info?.logoUrl} alt="" /> : <GrainIcon />}
        <p>{info?.label || 'Select Network'}</p>
      </div>
      {open && (
        <div className="network__selector__list">
          <h3>Select a Network</h3>
          <Row targetChain={SupportedChainId.BSCMAINNET} onSelectChain={handleChainSwitch} name="BNB MAIN"/>
          <Row targetChain={SupportedChainId.POLYGON} onSelectChain={handleChainSwitch} name="Polygon"/>
          <Row targetChain={SupportedChainId.BSCTESTNET} onSelectChain={handleChainSwitch} name="BSC Test"/>
          <Row targetChain={SupportedChainId.LOCALNET} onSelectChain={handleChainSwitch} name="Local"/>
        </div>
      )}
    </div>
  )
}

export default NetworkSelector
