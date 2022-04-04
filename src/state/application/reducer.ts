import { createReducer, nanoid, createSlice } from '@reduxjs/toolkit'
import { DEFAULT_TXN_DISMISS_MS } from '../../constants/misc'
import {
  addPopup,
  PopupContent,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
  updateBlockNumber,
} from './actions'

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

export interface ApplicationState {
  blockNumber: { [chainId: number]: number }
  popupList: PopupList
  walletModalOpen: boolean
  settingsMenuOpen: boolean
  readonly chainId: number | null
  readonly openModal: ApplicationModal | null
}

const initialState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  walletModalOpen: false,
  settingsMenuOpen: false,
  chainId: null,
  openModal: null,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(toggleWalletModal, (state) => {
      state.walletModalOpen = !state.walletModalOpen
    })
    .addCase(toggleSettingsMenu, (state) => {
      state.settingsMenuOpen = !state.settingsMenuOpen
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 15000 } }) => {
      state.popupList = (key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false
        }
      })
    })
)

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  SELF_CLAIM,
  ADDRESS_CLAIM,
  CLAIM_POPUP,
  MENU,
  DELEGATE,
  VOTE,
  POOL_OVERVIEW_OPTIONS,
  NETWORK_SELECTOR,
  PRIVACY_POLICY,
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateChainId(state, action) {
      const { chainId } = action.payload
      state.chainId = chainId
    },
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
    addPopup2(state, { payload: { content, key, removeAfterMs = DEFAULT_TXN_DISMISS_MS } }) {
      state.popupList = (key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    },
    removePopup2(state, { payload: { key } }) {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false
        }
      })
    },
  },
})

export const { updateChainId, setOpenModal, addPopup2, removePopup2 } = applicationSlice.actions
