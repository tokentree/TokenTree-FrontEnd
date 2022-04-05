import { MenuEntry } from '@pancakeswap-libs/uikit'
import Metamask from './icons/MetaMask'
import MathWallet from './icons/MathWallet'
import TokenPocket from './icons/TokenPocket'
import TrustWallet from './icons/TrustWallet'
import WalletConnect from './icons/WalletConnect'
import BinanceChain from './icons/BinanceChain'
import SafePalWallet from './icons/SafePalWallet'
import { Config, ConnectorNames } from './types'

export const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'TrustWallet',
    icon: TrustWallet,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'MathWallet',
    icon: MathWallet,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'TokenPocket',
    icon: TokenPocket,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
  {
    title: 'Binance Chain Wallet',
    icon: BinanceChain,
    connectorId: ConnectorNames.BSC,
  },
  {
    title: 'SafePal Wallet',
    icon: SafePalWallet,
    connectorId: ConnectorNames.Injected,
  },
]

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
      // {
      //   label: 'Chart',
      //   href: 'https://dex.nhancv.com/0xE0dFffc2E01A7f051069649aD4eb3F518430B6a4',
      // },
    ],
  },
]

export default config

export const connectorLocalStorageKey = 'connectorId'
