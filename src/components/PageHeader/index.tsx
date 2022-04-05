import React, { ReactNode } from 'react'
import { useModal, TuneIcon, HistoryIcon } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import SettingsModal from './SettingsModal'
import RecentTransactionsModal from './RecentTransactionsModal'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  const TranslateString = useI18n()
  const [onPresentSettings] = useModal(<SettingsModal translateString={TranslateString}/>)
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal translateString={TranslateString} />)

  return (
    <div className="page__header">
      <div className="page__header__container">
        <div className="page__header__details">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <button type="button" onClick={onPresentSettings} title={TranslateString(1200, 'Settings')}>
          <TuneIcon width="24px" color="currentColor" />
        </button>
        <button
          type="button"
          onClick={onPresentRecentTransactions}
          title={TranslateString(1202, 'Recent transactions')}
        >
          <HistoryIcon width="24px" color="currentColor" />
        </button>
      </div>
      {children && <div className="page__header__child">{children}</div>}
    </div>
  )
}

export default PageHeader
