import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Pair } from '@pancakeswap-libs/sdk'
import { Text } from '@pancakeswap-libs/uikit'
import { Link } from 'react-router-dom'
import CardNav from 'components/CardNav'
import Question from 'components/QuestionHelper'
import FullPositionCard from 'components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { Dots } from 'components/swap/styleds'
import useI18n from 'hooks/useI18n'
import PageHeader from 'components/PageHeader'

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const TranslateString = useI18n()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  return (
    <div className="pool__component" id="pool__component">
      <CardNav />
      <div className="app__body">
        <PageHeader
          title={TranslateString(262, 'Liquidity')}
          description={TranslateString(1168, 'Add liquidity to receive LP tokens')}
        >
          <Link id="join-pool-button" to="/add/BNB">
            {TranslateString(168, 'Add Liquidity')}
          </Link>
        </PageHeader>
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="12px" style={{ width: '100%' }}>
            <RowBetween padding="0 8px">
              <p id="paragraph">{TranslateString(107, 'Your Liquidity')}</p>
              <Question
                text={TranslateString(
                  1170,
                  'When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below.'
                )}
              />
            </RowBetween>

            {!account ? (
              <LightCard padding="40px">
                <Text color="textDisabled" textAlign="center">
                  {TranslateString(156, 'Connect to a wallet to view your liquidity.')}
                </Text>
              </LightCard>
            ) : v2IsLoading ? (
              <LightCard padding="40px">
                <Text color="textDisabled" textAlign="center">
                  <Dots>Loading</Dots>
                </Text>
              </LightCard>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                {allV2PairsWithLiquidity.map((v2Pair) => (
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                ))}
              </>
            ) : (
              <LightCard padding="40px">
                <Text color="textDisabled" textAlign="center">
                  {TranslateString(104, 'No liquidity found.')}
                </Text>
              </LightCard>
            )}

            <div className="pool__bottom__details">
              <p>
                {TranslateString(106, "Don't see a pool you joined?")}{' '}
                <StyledInternalLink id="import-pool-link" to="/find">
                  {TranslateString(108, 'Import it.')}
                </StyledInternalLink>
              </p>
              <p>
                {TranslateString(1172, 'Or, if you staked your LP tokens in a farm, unstake them to see them here.')}
              </p>
            </div>
          </AutoColumn>
        </AutoColumn>
      </div>
    </div>
  )
}
