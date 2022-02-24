import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Card, Flex, Heading, Input, Text, } from '@pancakeswap/uikit'
import Spacer from 'components/Spacer'
import ConnectWalletButton from 'components/ConnectWalletButton'
import IroDetailBuy from './IroDetailBuy'
import IroDetailAfter from './IroDetailAfter'
// import { DeserializedFarm } from 'state/types'
// import { getBscScanLink } from 'utils'
// import { useTranslation } from 'contexts/Localization'
// import ExpandableSectionButton from 'components/ExpandableSectionButton'
// import { BASE_ADD_LIQUIDITY_URL } from 'config'
// import { getAddress } from 'utils/addressHelpers'
// import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
// import DetailsSection from './DetailsSection'
// import CardHeading from './CardHeading'
// import CardActionsContainer from './CardActionsContainer'


const StyledCard = styled(Card)`
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

  margin: 32px 16px 16px;
  min-height: 300px;
  max-width: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 32px;
  color: rgb(69, 42, 122);
  overflow: hidden;
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 35%;
    margin-top: 24px;
  }
`

const WrapperHeader = styled.div`
  background: linear-gradient(#fffaae 0%, #fffaae 100%);
  padding: 24px;
`

const WrapperBody = styled.div`
  padding: 24px;
  font-weight: 600 !important;
`

const InputPanel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(238, 234, 244);
  border-radius: 16px;
  color: rgb(69, 42, 122);
  box-shadow: rgb(74 74 104 / 10%) 0px 2px 2px -1px inset;
  padding: 8px 16px 8px 0px;
  width: 100%;
  margin: 12px 0px;

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

// const StyledButton = styled(Button)`
//   -webkit-box-align: center;
//   align-items: center;
//   border-radius: 16px;
//   cursor: pointer;
//   display: inline-flex;
//   font-family: inherit;
//   font-size: 16px;
//   font-weight: 600;
//   -webkit-box-pack: center;
//   justify-content: center;
//   letter-spacing: 0.03em;
//   line-height: 1;
//   opacity: 1;
//   outline: 0px;
//   transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
//   height: 32px;
//   padding: 0px 16px;
//   background-color: transparent;
//   border: 2px solid rgb(3, 63, 89);
//   box-shadow: none;
//   color: rgb(3, 63, 89);
// `
const StyledInput = styled(Input)`
  box-shadow: none;
  width: 100%;
  margin: 0px 8px;
  padding: 0px 8px;
  
`

const StyledHeading = styled(Heading)`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
`
const StyledText = styled(Text)`
  color: rgb(69, 42, 122);
  line-height: 1.5;
  text-transform: uppercase;
  font-weight: 600;
`
const IroDetailInfo = () => {

    return (
        <StyledCard>
          <WrapperHeader >
            <Flex flexDirection="column" >  
                <StyledHeading>
                RushMars Informations
                </StyledHeading>
            </Flex>
          </WrapperHeader>
          <WrapperBody>
            <Text>
            - ScroogeSwap (SCROOGE) is the next generation of Automated Market Making (AMM) decentralized exchange with a deflationary governance token model.
            </Text>
            <Text >
            - We are your go-to yield farm running on Binance Smart Chain and Polygon, with lots of other features that let you earn tokens.
            </Text>
            <Text>
            - As with the current wave of second generation yield farms, the aim is to create a perpetual deflation token, the SCROOGE, with a continual burn mechanism in order to field an environment that can sustain long term gains with consistently high APR for greater earnings.
            </Text>
          </WrapperBody>
        </StyledCard>
    )

}

export default IroDetailInfo

