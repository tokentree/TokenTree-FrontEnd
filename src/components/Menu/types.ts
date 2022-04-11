import { FC, SVGAttributes } from 'react'
import { DefaultTheme } from 'styled-components'
import { SpaceProps } from 'styled-system'

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
  theme?: DefaultTheme
  spin?: boolean
}

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  BSC = 'bsc',
}

export type Login = (connectorId: ConnectorNames) => void

export interface Config {
  title: string
  icon: FC<SvgProps>
  connectorId: ConnectorNames
}
