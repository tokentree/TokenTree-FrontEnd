/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable spaced-comment */
import React, { useRef, useEffect, useState } from 'react'
import { useWalletModal } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import throttle from 'lodash/throttle'
import { Link } from 'react-router-dom'
import './index.css'
import LanguageIcon from '@mui/icons-material/Language'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LightModeIcon from '@mui/icons-material/LightMode'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
//import { useWalletModal } from '../../WalletModal'
import useMatchBreakpoints from '../../hooks/useMatchBreakpints'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const profile = useGetLocalProfile()

  ////

  const { isXl } = useMatchBreakpoints()
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)
  const [menu, setMenu] = useState(false)
  const [network, setNetwork] = useState('eth')
  const [networkOpen, setNetworkOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const ariaLabel = 'Link to profile'
  const icon = profile.image ? (
    <img src={profile.image} alt="profile avatar" height="32px" width="32px" />
  ) : (
    <AccountCircleIcon />
  )
  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  useEffect(() => setNetworkOpen(false), [network])

  return (
    <div className="menu__component">
      <nav className="menu__navbar">
        <div className="menu__navbar__logo">
          <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/tree.png" alt="logo" />
          <h2>TokenTree</h2>
        </div>

        <div className="menu__navbar__buttons">
          <div
            className="menu__network"
            onMouseEnter={() => setNetworkOpen(true)}
            onMouseLeave={() => setNetworkOpen(false)}
          >
            <div className="menu__network__button">
              {network === 'eth' ? 'Ethereum' : 'Avalanche'}
              <ArrowForwardIosIcon
                style={networkOpen ? { transform: 'rotate(-90deg)' } : { transform: 'rotate(90deg)' }}
              />
            </div>
            {networkOpen && (
              <div className="menu__network__options">
                <div onClick={() => setNetwork('eth')}>Ethereum</div>
                <div onClick={() => setNetwork('avax')}>Avalanche</div>
              </div>
            )}
          </div>
          <div className="menu__connect__button__container">
            {account ? (
              <button
                onClick={() => {
                  onPresentAccountModal()
                }}
              >
                {accountEllipsis}
              </button>
            ) : (
              <button
                scale="sm"
                onClick={() => {
                  onPresentConnectModal()
                }}
              >
                Connect
              </button>
            )}
          </div>
          {profile && (
            <div
              title={profile.username}
              className="menu__profile__icon"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <Link to={profile.link} aria-label={ariaLabel}>
                {icon}
              </Link>
              {profile.showPip && <div />}
              {profileOpen && (
                <div className="menu__profile__menu">
                  <div>
                    <button>
                      <LightModeIcon />
                    </button>
                    <button>
                      <NightlightRoundIcon />
                    </button>
                  </div>

                  <button>
                    <LanguageIcon /> En
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <div className="menu__body">
        {/*<div className="menu__sidebar">
          <div className="menu__body__upper">
            <Link to="/swap">Home</Link>
            <p onClick={() => setMenu(!menu)}>Trade</p>
            {menu && (
              <div className="menu__body--open">
                <Link to="/swap">Exchange</Link>
                <Link to="/pool">Liquidity</Link>
              </div>
            )}
          </div>
          <div className="menu__body__footer">
            <div>
              <LightModeIcon />
              <NightlightRoundIcon />
            </div>
            <div>
              <LanguageIcon /> En
            </div>
          </div>
        </div>*/}

        <div className="menu__body__children">{props.children}</div>
      </div>
    </div>
  )
}

export default Menu
