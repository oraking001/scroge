import React, { useState, useEffect, useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useModal, Heading, Card, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useERC20, usePresale } from 'hooks/useContract'
import { IfoStatus } from 'config/constants/types'
import addresses from 'config/constants/contracts'
import ConnectWalletButton from 'components/ConnectWalletButton'
// import { usePreSaleApprove } from 'hooks/useApprove'
// import { usePreSaleAllowance } from 'hooks/useAllowance'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPresaleAddress } from 'utils/addressHelpers'
import { getPresaleContract } from 'utils/contractHelpers'
import CardValue from 'components/CardValue'
import Spacer from 'components/Spacer'
import useTokenBalance from 'hooks/useTokenBalance'
import LabelButton from './LabelButton'
import StakeModal from './StakeModal'
import { useApprovePresale } from '../hooks/useApprove'



const StyledPreSaleCard = styled(Card)`
  background-color: rgb(18, 24, 39);
  background: rgb(18, 24, 39);
  padding: 16px 16px 16px;
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  width: 100%;
  border-radius: 5px!important;
  margin-top: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 16px 16px 16px;
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;
    width: 100%;
    border-radius: 5px!important;
  }
`
const Row = styled.div`
  display: block;
  padding-top: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    padding-top: 24px;
  }
`
const RowItem = styled.div`
  display: flex;
  padding-top: 16px;
  justify-content: space-between;
  
`

export interface Props {
  currency: string
  currencyAddress: string
  tokenAddress: string
}

const BuyToken: React.FC<Props> = ({
  currency,
  currencyAddress,
  tokenAddress,
}) => {

  const contract = useMemo(() => { return getPresaleContract()}, [])
  console.log('debug contract', contract)
  const presaleAddress = getPresaleAddress()


  const [amount, setAmount] = useState(new BigNumber(0))
  const [isActive, setActive] = useState(false)
  const { account } = useActiveWeb3React()
  const [totalSoldToken, setTotalSoldToken] = useState(new BigNumber(0))
  const [min, setMin] = useState(new BigNumber(0))
  const [tokenPrice, setTokenPrice] = useState(new BigNumber(1))
  
  // 
  const [buyLimit, setBuyLimit] = useState(new BigNumber(0))
  const [rate, setRate] = useState(new BigNumber(1))
  const [allowance, setAllowance]= useState(new BigNumber(0))
  const [contractBalance, setContractBalance]= useState(new BigNumber(0))
  const [totalSupply, setTotalSupply]= useState(new BigNumber(0))

  const contractSellingToken = useERC20(tokenAddress)
  const contractBuyingToken = useERC20(currencyAddress)
  const { balance: busdBalance } = useTokenBalance(currencyAddress)
  const { balance: tokenBalance } = useTokenBalance(tokenAddress)

  const [onPresentContributeModal] = useModal(
    // tokenAddress: string
    // stakingLimit: BigNumber
    // balance: BigNumber
    // stakingTokenPrice: number
    <StakeModal
      tokenAddress='0x3C0fDb21B166e553281C06010d6D97A33f6E792A'
      stakingLimit={buyLimit}
      balance={busdBalance}
      stakingTokenPrice={rate.toNumber()}
    />,
  )

  const { handleApprove, requestedApproval } = useApprovePresale(contractBuyingToken)


  useEffect(() => {
    const fetchV = async () => {

      setAllowance(new BigNumber(0))
      const _buyLimit = await contract.maxLimit()
      const _rate = await contract.rate()
      const _totalSoldToken = await contract.totalDepositedBalance()
      const _contractBalance = await contractSellingToken.balanceOf(presaleAddress)
      const _totalSupply = await contractSellingToken.totalSupply()
      const _startTime = await contract.startTime()
      const _active = _startTime < Date.now()
      
      
      setRate(new BigNumber(_rate.toString()))
      setBuyLimit(new BigNumber(_buyLimit.toString()))
      setContractBalance(new BigNumber(_contractBalance.toString()))
      setTotalSupply(new BigNumber(_totalSupply.toString()))
      setActive(_active)
      setTotalSoldToken(new BigNumber(_totalSoldToken.toString()))
    }

    const fetch = async () => {
      const _amount = await contract.depositedBalance(account)
      const _allowance = await contractBuyingToken.allowance(account, presaleAddress)
      setAllowance(new BigNumber(_allowance.toString()))
      setAmount(new BigNumber(_amount.toString()))
    }
    fetchV()
    if(account)
      fetch()
  }, [account, contract, contractBuyingToken, presaleAddress, contractSellingToken, requestedApproval])
  const isApproved = allowance.toNumber() > 0
  return (
    <>
    {!isActive && <Heading size="lg" style={{textAlign:'center'}}>PreSale is not active</Heading>}
    <StyledPreSaleCard >
      <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#7584e9'}} >Buy DUCK</Heading>
      {!account && <ConnectWalletButton width='100%' />}
        {account && (
        <LabelButton
          disabled={!(isActive)}
          buttonLabel={isApproved ? 'Contribute' : 'Approve'}
          label={`Your contribution (${currency})`}
          value={
            Number(getBalanceNumber(new BigNumber(amount)).toFixed(8)).toString()
          }
          onClick={isApproved ? onPresentContributeModal : handleApprove}
        />
        )}
        <RowItem>
          <Text mr='16px' ml='16px' color="primary" fontSize='20px'>Total Contributed: </Text>
          <Text mr='16px' color="text" fontSize='20px'>{getBalanceNumber(totalSoldToken) * rate.toNumber()} BUSD</Text>
        </RowItem>
        <RowItem>
          <Text mr='16px' ml='16px' color="primary" fontSize='20px'>Hardcap: </Text>
          <Text mr='16px' color="text" fontSize='20px'>4,500,000 BUSD</Text>
        </RowItem>
        <RowItem>
          <Text mr='16px' ml='16px' color="primary" fontSize='20px'>Max Supply: </Text>
          <CardValue value={getBalanceNumber(totalSupply)} decimals={0} fontSize='20px' />
        </RowItem>

    </StyledPreSaleCard>
    </>
  )
}

export default BuyToken
