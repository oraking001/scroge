import React, { useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from '@pancakeswap/uikit'
// import BalanceInput from 'components/Input/BalanceInput'
import useTokenBalance, { FetchStatus } from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import addresses from 'config/constants/contracts'
import Web3 from 'web3';

interface Props {
  currency: string
  contract: any
  currencyAddress: string
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ currency, contract, currencyAddress, onDismiss }) => {
  const { chainId } = useActiveWeb3React()
  const address = addresses.presale[chainId]
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useActiveWeb3React()
  const balanceState = useTokenBalance(currencyAddress)
  const balance = getFullDisplayBalance(balanceState.fetchStatus === SUCCESS ? balanceState.balance : new BigNumber(0), 18)

  return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      {/* <BalanceInput
        value={value}
        onChange={(e: any) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
      /> */}
      <Flex justifyContent="space-between" mb="24px">
        <Button variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            const web3 = new Web3(Web3.givenProvider);
            await web3.eth.sendTransaction({
              from:account, 
              to: address, 
              value:web3.utils.toWei(value, "ether")} , function(error, hash){
                setPendingTx(false)
            });
              
            setPendingTx(false)
            onDismiss()
          }}
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  )
}

export default ContributeModal
