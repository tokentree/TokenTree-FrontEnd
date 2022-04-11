/* eslint-disable spaced-comment */
import JSBI from 'jsbi'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const NetworkContextName = 'NETWORK'

export const IS_IN_IFRAME = window.parent !== window

export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30
export const L2_DEADLINE_FROM_NOW = 60 * 5

export const DEFAULT_TXN_DISMISS_MS = 25000
export const L2_TXN_DISMISS_MS = 5000

export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)
