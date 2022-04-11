/* eslint-disable react/jsx-filename-extension */
/* eslint-disable spaced-comment */
import React, { useMemo } from 'react'
import { CheckmarkCircleIcon, ErrorIcon, LinkExternal } from '@pancakeswap-libs/uikit'
import { useActiveWeb3React } from 'hooks'
import { getBscScanLink } from 'utils'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import Loader from 'components/Loader'
import Modal from '../Modal/Modal'

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const newTransactionsFirst = (a, b) => b.addedTime - a.addedTime

const getRowStatus = (sortedRecentTransaction) => {
  const { hash, receipt } = sortedRecentTransaction

  if (!hash) {
    return { icon: <Loader />, color: 'text' }
  }

  if (hash && receipt?.status === 1) {
    return { icon: <CheckmarkCircleIcon color="success" />, color: 'success' }
  }

  return { icon: <ErrorIcon color="failure" />, color: 'failure' }
}

const RecentTransactionsModal = ({ onDismiss = defaultOnDismiss, translateString }) => {
  const { account, chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()

  // Logic taken from Web3Status/index.tsx line 175
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  return (
    <Modal title={translateString(1202, 'Recent transactions')} onDismiss={onDismiss}>
      {!account && (
        <div className="transaction__modal">
          <p>Please connect your wallet to view your recent transactions</p>
          <button type="button" onClick={onDismiss}>
            Close
          </button>
        </div>
      )}
      {account && chainId && sortedRecentTransactions.length === 0 && (
        <div className="transaction__modal">
          <p>No recent transactions</p>
          <button type="button" onClick={onDismiss}>
            Close
          </button>
        </div>
      )}
      {account &&
        chainId &&
        sortedRecentTransactions.map((sortedRecentTransaction) => {
          const { hash, summary } = sortedRecentTransaction
          const { icon, color } = getRowStatus(sortedRecentTransaction)

          return (
            <>
              <div className="transaction__modal" key={hash}>
                <LinkExternal href={getBscScanLink(chainId, hash, 'transaction')} color={color}>
                  {summary ?? hash}
                </LinkExternal>
                {icon}
              </div>
            </>
          )
        })}
    </Modal>
  )
}

export default RecentTransactionsModal
