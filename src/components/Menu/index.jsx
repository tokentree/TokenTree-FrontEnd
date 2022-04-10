/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable spaced-comment */
import React, { useRef, useEffect, useState } from 'react'
//import { useWalletModal } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import throttle from 'lodash/throttle'
import { Link } from 'react-router-dom'
import LanguageIcon from '@mui/icons-material/Language'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LightModeIcon from '@mui/icons-material/LightMode'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import NetworkSelector from './NetworkSelector'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'
import Logo from '../../assets/logo.svg'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const profile = useGetLocalProfile()

  const refPrevOffset = useRef(window.pageYOffset)
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
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  const [open, setOpen] = useState('')

  return (
    <>
      <div className="menu__component">
        <nav className="menu__navbar">
          <div className="menu__navbar__logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="menu__navbar__buttons">
            <NetworkSelector />
            <div className="menu__connect__button__container">
              {account ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen('account')
                  }}
                >
                  {accountEllipsis}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setOpen('connect')
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
                <Link to="/" aria-label={ariaLabel}>
                  {icon}
                </Link>
                {profile.showPip && <div />}
                {profileOpen && (
                  <div className="menu__profile__menu">
                    <div>
                      <button>
                        <LightModeIcon />
                      </button>
                      /
                      <button disabled>
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
          <div className="menu__body__children">{props.children}</div>
        </div>
      </div>
      {open === 'connect' && <ConnectModal login={login} setOpen={setOpen} />}
      {open === 'account' && <AccountModal account={account || ''} logout={logout} setOpen={setOpen} />}
    </>
  )
}

export default Menu
