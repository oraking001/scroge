import React, { useState, useEffect, useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Heading, Card, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useERC20 } from 'hooks/useContract'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPresaleAddress } from 'utils/addressHelpers'
import { getPresaleContract } from 'utils/contractHelpers'
import Spacer from 'components/Spacer'


const StyledPreSaleCard = styled(Card)`
  background-color: rgb(20, 24, 39);
  background: rgb(20, 24, 39);
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
const RowICO = styled.div`
  display: flex;
  padding-top: 16px;
  justify-content: space-evenly;
  
`

const RowItem = styled.div`
  display: flex;
  padding-top: 16px;
  justify-content: space-between;
  
`


export interface Props {
  currencyAddress: string
  tokenAddress: string
}

const PresaleInfo: React.FC<Props> = ({
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
      <Heading size="lg" mb="24px" style={{textAlign:'center', color:'#7584e9'}}>PreSale Info </Heading>
      <hr style={{borderColor:"#5178b3"}}/>
      <RowICO>
        <div>
          <Text fontSize='20px' color='primary'> Presale Start </Text>
          <Text fontSize='20px' color="text"> 2020/10/20</Text>
        </div>
        <div>
          -
        </div>
        <div>
          <Text fontSize='20px' color="primary">Presale End </Text>
          <Text fontSize='20px' color="text"> 2020/10/30 </Text>
        </div>
        <div>
          -
        </div>
        <div>
          <Text fontSize='20px' color="primary"> Claim </Text>
          <Text fontSize='20px' color="text">2020/11/1</Text>
        </div>
      </RowICO>
      <hr style={{borderColor:"#5178b3"}}/>
      <RowItem>
        <Text fontSize='20px' ml='16px' color="primary"> DUCK Presale Price: </Text>
        <Text fontSize='20px' mr='10px' color="text">{Number(tokenPrice.toFixed(8))} BUSD </Text>
      </RowItem>
      <hr style={{borderColor:"#5178b3"}}/>
      <RowItem>
        <Text fontSize='20px' ml='16px' color="primary"> DUCK Launch Price:  </Text>
        <Text fontSize='20px' mr='10px' color="text">1 BUSD </Text>
      </RowItem>
      <hr style={{borderColor:"#5178b3"}}/>
      <RowItem>
        <Text fontSize='20px' ml='16px' color="primary">  Token on Sale:  </Text>
        <Text fontSize='20px' mr='10px' color="text"> 5000000 </Text>
      </RowItem>
    </StyledPreSaleCard>
    </>
  )
}

export default PresaleInfo
