import React, { useState, useEffect, useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useModal, Heading, Card, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useERC20 } from 'hooks/useContract'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPresaleAddress } from 'utils/addressHelpers'
import { getPresaleContract } from 'utils/contractHelpers'
import CardValue from 'components/CardValue'
import useTokenBalance from 'hooks/useTokenBalance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Spacer from 'components/Spacer'
// import StakeModal from './StakeModal'


const StyledPreSaleCard = styled(Card)`
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

const RowItem = styled.div`
  display: flex;
  padding-top: 16px;
  justify-content: space-between;
  
`
const ButtonWdith = styled.div`
  width: 200%
`
export interface Props {
  currencyAddress: string
  tokenAddress: string
}

const UserStatus: React.FC<Props> = ({
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
  return (
    <>
    {!isActive && <Heading size="lg" style={{textAlign:'center'}}>PreSale is not active</Heading>}
    <StyledPreSaleCard>
      <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#7584e9'}}>User Status </Heading>
      <hr style={{borderColor:"#5178b3"}}/>
      <RowItem>
        <Text mr='16px' ml='16px' color="primary" fontSize='20px'>Your DUCK Balance: </Text>
        <CardValue value={getBalanceNumber(tokenBalance)} decimals={0} fontSize='20px' />
      </RowItem>
      <hr style={{borderColor:"#5178b3"}}/>
      <RowItem>
        <Text mr='16px' ml='16px' color="primary" fontSize='20px'>Your BUSD Balance:</Text>
        <CardValue value={getBalanceNumber(busdBalance)} decimals={0} fontSize='20px'/>
      </RowItem>
      <Spacer size='md'/>
      <Heading />
      {!account && <ConnectWalletButton width='100%' />}
    </StyledPreSaleCard>
    </>
  )
}

export default UserStatus
