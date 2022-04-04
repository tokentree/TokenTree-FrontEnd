import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

export default function useActiveWeb3React() {
  const interfaceContext = useWeb3React<Web3Provider>()

  return interfaceContext
}
