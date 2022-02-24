import React, { useState, useEffect, useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useModal, Heading, Card } from '@pancakeswap/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useERC20 } from 'hooks/useContract'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPresaleAddress } from 'utils/addressHelpers'
import { getPresaleContract } from 'utils/contractHelpers'
import useTokenBalance from 'hooks/useTokenBalance'
import { CircularProgressbar} from 'react-circular-progressbar'
import StakeModal from './StakeModal'
import { useApprovePresale } from '../hooks/useApprove'
import 'react-circular-progressbar/dist/styles.css'

const StyledCard = styled(Card)`
  background-color: rgb(18, 24, 39);
  background: rgb(18, 24, 39);
  padding: 16px 16px 16px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
  border-radius: 5px!important;
  margin-top: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 16px 16px 16px;
    margin-left: auto;
    margin-right: auto;
    max-width: 437px;
    width: 100%;
    border-radius: 5px!important;
  }
`

export interface Props {
  currency: string
  currencyAddress: string
  tokenAddress: string
}

const TotalCollected: React.FC<Props> = ({
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
  }, [account, contract, contractBuyingToken, presaleAddress, contractSellingToken])
  const hardCap = 4500000
  const percentage = getBalanceNumber(totalSoldToken) * rate.toNumber() * 10000 / hardCap
  const fixPercentage = parseFloat(percentage.toFixed(2))
  console.log('debug->rate', percentage)
  return (
    <>
    {!isActive && <Heading size="lg" style={{textAlign:'center'}}>PreSale is not active</Heading>}
    <StyledCard>
      <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#7584E9'}} >Total Collected </Heading>
      <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#CEA427'}} >{getBalanceNumber(totalSoldToken) * rate.toNumber()} BUSD </Heading>
      <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#1fc7d4'}} >USDC COLLECTED SINCE THE START OF THE PRESALE. </Heading>
      <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#1fc7d4'}} >HardCAP OF {hardCap} BUSD</Heading>
      <CircularProgressbar value={fixPercentage/100} text={`${fixPercentage/100}%`}  />
    </StyledCard>
    </>
  )
}

export default TotalCollected
