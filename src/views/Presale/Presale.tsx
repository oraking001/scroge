import React from 'react'
import Page from 'components/Layout/Page'
import styled from 'styled-components'
import { Button, Card, Flex, Heading, Input, Text, } from '@pancakeswap/uikit'
import Hero from './components/Hero'
import ClaimTitle from './components/ClaimTitle'
import TotalCollected from './components/TotalCollected'
import UserStatus from './components/UserStatus'
import PresaleInfo from './components/PresaleInfo'
import BuyToken from './components/BuyToken'
import IroBuy from './components/IroBuy'
import IroWithdraw from './components/IroWithdraw'
import IroDetailBuy from './components/IroDetailBuy'
import IroDetailAfter from './components/IroDetailAfter'
import IroDetailPart from './components/IroDetailPart'
import IroDetailInfo from './components/IroDetailInfo'
// import PresaleContribute from './components/PresaleContribute'
// import Divider from './components/Divider'


const RowFirst = styled.div`
  display: block;
  padding-top: 10px;
  width: 100%;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`
const RowSecond = styled.div`
  display: block;
  padding-top: 10px;
  width: 100%;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    margin-top: 24px;
  }
`

const StyledCard = styled(Card)`
  margin: auto;
  width: 100%;
  background: rgb(250, 249, 250);
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 70%;
  }
`
const WrapperHeader = styled.div`
  background: linear-gradient(#fffaae 0%, #fffaae  100%);
  padding: 24px;
  text-align: center;
`
const StyledHeading = styled(Heading)`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
`

const StyledText = styled(Text)`
  line-height: 1.5;
  font-weight: 600;
  font-size: 16px
`
const WrapperFooter = styled.div`
  padding: 1rem;
  text-align: end;
`
const StyledDetail = styled(Card)`
  // max-width: 40%;
  // margin: 0 8px 24px;
  // display: flex;
  // flex-direction: column;
  // align-self: baseline;
  // position: relative;
  // color: #ff0000;

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   margin: 0 12px 46px;
  // }

  box-shadow: rgb(0 152 161) 0px 0px 0px 1px, rgb(31 199 212 / 40%) 0px 0px 4px 8px;
  margin: 32px 16px 16px;
  min-height: 300px;
  max-width: 40%;
  min-width: 280px;
  background-color: rgb(255, 255, 255);
  border-radius: 32px;
  color: rgb(69, 42, 122);
  overflow: hidden;
  position: relative;
`

const WrapperDetailPart = styled.div`
    min-height: 300px;
    margin-top: 32px;
    max-width: 40%;
`

const RowItem = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
`

const Presale = () => {
  // token address
  const currencyAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56"
  const tokenAddress = "0x3C0fDb21B166e553281C06010d6D97A33f6E792A"
  return(
    <>
      <Page>
      <StyledCard>
        <WrapperHeader>
          <StyledHeading>
            #SCROOGE PRESALE
          </StyledHeading>
        </WrapperHeader>
        <RowFirst>
          <IroBuy/>
          <IroWithdraw />
        </RowFirst>
        <WrapperFooter>
          <Text>
            Learn more about RushMars (RMARS)
          </Text>
          <Text>
            Project Website
          </Text>
        </WrapperFooter>
      </StyledCard>
      <RowSecond>
          <IroDetailPart />
          <IroDetailInfo />
      </RowSecond>
      </Page>
    </>
  )
}

export default Presale
