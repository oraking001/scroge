import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Card, Flex, Heading, Input, Text, } from '@pancakeswap/uikit'
import Spacer from 'components/Spacer'
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

  box-shadow: #fffaa2 0px 0px 0px 1px, rgb(255 255 174 / 40%) 0px 0px 4px 8px;
  margin: 32px 16px 16px;
  min-height: 300px;
  max-width: 40%;
  min-width: 280px;
  background-color: rgb(255, 255, 255);
  border-radius: 32px;
  color: rgb(69, 42, 122);
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.mediaQueries.xs} {
      margin: auto;
      margin-top: 24px;
    }
`

const WrapperHeader = styled.div`
  min-height: 84px;
  background: linear-gradient(111.68deg, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%);
  padding: 24px;
`

const WrapperBody = styled.div`
  font-weight: 600 !important;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin: auto;
    padding: 24px;
  }
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
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-left: 3px;
    margin-right: 3px;
    margin-bottom: 4px;
`
const RowItemBuy = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-left: 16px;
`

const RowItemInput = styled.div`
  display: flex;
  align-items: flex-end;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-top: 8px;
`

const StyledButton = styled(Button)`
  -webkit-box-align: center;
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  -webkit-box-pack: center;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: 1;
  outline: 0px;
  transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
  height: 32px;
  padding: 0px 16px;
  background-color: #fffaae;
  box-shadow: none;
  color: #1a2441;
`
const StyledInput = styled(Input)`
  box-shadow: none;
  width: 100%;
  margin: 0px 8px;
  padding: 0px 8px;
  background-color: rgb(238, 234, 244);
  border: 0px;
  border-radius: 16px;
  box-shadow: rgb(74 74 104 / 10%) 0px 2px 2px -1px inset;
  color: rgb(69, 42, 122);
  display: block;
  font-size: 16px;
  height: 40px;
  outline: 0px;
  padding: 0px 16px;
  width: 100px;
  
`

const StyledHeading = styled(Heading)`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
`
const StyledText = styled(Text)`
  line-height: 1.5;
  text-transform: uppercase;
  font-weight: 600;
`
const StyledBuyButton = styled(Button)`
  color: #1a2441;
  width: 100%
`
const IroBuy = () => {

    return (
        <StyledCard>
          <WrapperHeader >
            <Flex flexDirection="column" >  
                <StyledHeading>
                    Buy
                </StyledHeading>
            </Flex>
          </WrapperHeader>
          <WrapperBody>
            <StyledText fontSize='12px'>
              Your Contribution
            </StyledText >
            <StyledText fontSize='20px' mr='sm'>
              0.000 / 5BNB
            </StyledText>
            <StyledText fontSize='12px'>
              Purchase Tokens
            </StyledText>
            <StyledText fontSize='20px' mr='sm'>
              0.000
            </StyledText>
            <InputPanel>
              <RowItemBuy>
                <Text fontSize='14px'>
                  Buy
                </Text>
                <Text fontSize='14px'>
                  Balance 0.0963
                </Text>
              </RowItemBuy>
              <RowItemInput margin-top='8px'>
                <StyledInput placeholder='0' scale='sm' />
                <StyledButton>
                  Max
                </StyledButton>
                <Text>
                  BNB
                </Text>
              </RowItemInput>
            </InputPanel>
            <RowItem>
              <Text> Spend </Text>
              <StyledText fontSize='16px'> 0 BNB</StyledText>
            </RowItem> 
            <RowItem>
              <Text> Get </Text>
              <StyledText fontSize='16px'> 0 SCROOGE</StyledText>
            </RowItem>   
          <Spacer size='sm' />
          <StyledBuyButton> Buy SCROOGE </StyledBuyButton>
          </WrapperBody>
        </StyledCard>
  
    )

}

export default IroBuy

