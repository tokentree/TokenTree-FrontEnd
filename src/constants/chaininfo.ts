/* eslint-disable spaced-comment */
import ms from 'ms.macro'

import { SupportedChainId, SupportedL1ChainId, SupportedL2ChainId } from './chains'

export enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly infoLink: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
}

export interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2
  readonly bridge: string
  readonly statusPage?: string
  readonly defaultListUrl: string
}

export type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  //readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} &
  { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ethereum',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.RINKEBY]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://rinkeby.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Rinkeby',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022',
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
  },
  [SupportedChainId.ROPSTEN]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://ropsten.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ropsten',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022',
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ropETH', decimals: 18 },
  },
  [SupportedChainId.KOVAN]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://kovan.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Kovan',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022',
    nativeCurrency: { name: 'Kovan Ether', symbol: 'kovETH', decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Görli',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022',
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
  },
  // [SupportedChainId.OPTIMISM]: {
  //  networkType: NetworkType.L2,
  //  blockWaitMsBeforeWarning: ms`25m`,
  //  bridge: 'https://gateway.optimism.io/?chainId=1',
  //  defaultListUrl: OPTIMISM_LIST,
  //  docs: 'https://optimism.io/',
  //  explorer: 'https://optimistic.etherscan.io/',
  //  infoLink: 'https://info.uniswap.org/#/optimism/',
  //  label: 'Optimism',
  //  logoUrl: 'https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=022',
  //  statusPage: 'https://optimism.io/status',
  //  helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
  //  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  // },
  // [SupportedChainId.OPTIMISTIC_KOVAN]: {
  //  networkType: NetworkType.L2,
  //  blockWaitMsBeforeWarning: ms`25m`,
  //  bridge: 'https://gateway.optimism.io/',
  //  defaultListUrl: OPTIMISM_LIST,
  //  docs: 'https://optimism.io/',
  //  explorer: 'https://optimistic.etherscan.io/',
  //  infoLink: 'https://info.uniswap.org/#/optimism/',
  //  label: 'Optimistic Kovan',
  //  logoUrl: 'https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=022',
  //  statusPage: 'https://optimism.io/status',
  //  helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
  //  nativeCurrency: { name: 'Optimistic Kovan Ether', symbol: 'kovOpETH', decimals: 18 },
  // },
  //[SupportedChainId.ARBITRUM_ONE]: {
  //  networkType: NetworkType.L2,
  //  blockWaitMsBeforeWarning: ms`10m`,
  //  bridge: 'https://bridge.arbitrum.io/',
  //  docs: 'https://offchainlabs.com/',
  //  explorer: 'https://arbiscan.io/',
  //  infoLink: 'https://info.uniswap.org/#/arbitrum',
  //  label: 'Arbitrum',
  //  logoUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022',
  //  defaultListUrl: ARBITRUM_LIST,
  //  helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
  //  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  //},
  //[SupportedChainId.ARBITRUM_RINKEBY]: {
  //  networkType: NetworkType.L2,
  //  blockWaitMsBeforeWarning: ms`10m`,
  //  bridge: 'https://bridge.arbitrum.io/',
  //  docs: 'https://offchainlabs.com/',
  //  explorer: 'https://rinkeby-explorer.arbitrum.io/',
  //  infoLink: 'https://info.uniswap.org/#/arbitrum/',
  //  label: 'Arbitrum Rinkeby',
  //  logoUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022',
  //  defaultListUrl: ARBITRUM_LIST,
  //  helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
  //  nativeCurrency: { name: 'Rinkeby Arbitrum Ether', symbol: 'rinkArbETH', decimals: 18 },
  //},
  [SupportedChainId.POLYGON]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon',
    logoUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022',
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://mumbai.polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Polygon Mumbai',
    logoUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022',
    nativeCurrency: { name: 'Polygon Mumbai Matic', symbol: 'mMATIC', decimals: 18 },
  },
  [SupportedChainId.BSCTESTNET]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://mumbai.polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'BNB Test',
    logoUrl: 'https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=022',
    nativeCurrency: { name: 'BSCTESTNET', symbol: 'bnb', decimals: 18 },
  },
  [SupportedChainId.BSCMAINNET]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://mumbai.polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'BNB Main',
    logoUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022',
    nativeCurrency: { name: 'BSCMAINNET', symbol: 'bnb', decimals: 18 },
  },
  [SupportedChainId.LOCALNET]: {
    networkType: NetworkType.L1,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: 'https://wallet.polygon.technology/bridge',
    docs: 'https://polygon.io/',
    explorer: 'https://mumbai.polygonscan.com/',
    infoLink: 'https://info.uniswap.org/#/polygon/',
    label: 'Local Net',
    logoUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022',
    nativeCurrency: { name: 'LOCALNET', symbol: 'bnb', decimals: 18 },
  },
  //[SupportedChainId.ARBITRUM_ONE]: {
  //  networkType: NetworkType.L2,
  //  blockWaitMsBeforeWarning: ms`10m`,
  //  bridge: 'https://bridge.arbitrum.io/',
  //  docs: 'https://offchainlabs.com/',
  //  explorer: 'https://arbiscan.io/',
  //  infoLink: 'https://info.uniswap.org/#/arbitrum',
  //  label: 'Arbitrum',
  //  logoUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022',
  //  defaultListUrl: ARBITRUM_LIST,
  //  helpCenterUrl: 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum',
  //  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  //},
}
