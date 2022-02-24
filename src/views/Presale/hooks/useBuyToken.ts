import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT } from 'config'
import { BIG_TEN } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const buyToken = async (presaleContract, amount, account, decimals = 18) => {
  const gasPrice = getGasPrice()
  const tx = await presaleContract.buyTokens(account, new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), {
    ...options,
    gasPrice,
  })
  const receipt = await tx.wait()
  return receipt.status
}

export default buyToken
