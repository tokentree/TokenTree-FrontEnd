import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useI18n from 'hooks/useI18n'

function Nav() {
  const tab = useLocation().pathname.slice(1)
  const TranslateString = useI18n()
  return (
    <div className="tab__nav__container">
      <div className="tab__nav">
        <Link id="swap-nav-link" to="/swap" className={tab === 'swap' ? 'tab__active' : 'tab'}>
          {TranslateString(1142, 'Swap')}
        </Link>
        <Link id="pool-nav-link" to="/pool" className={tab === 'pool' ? 'tab__active' : 'tab'}>
          {TranslateString(113, 'Liquidity')}
        </Link>
      </div>
    </div>
  )
}

export default Nav
