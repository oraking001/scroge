import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Card, Flex, Heading, Input, Text, } from '@pancakeswap/uikit'
import Spacer from 'components/Spacer'
import ConnectWalletButton from 'components/ConnectWalletButton'
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

const WrapperHeader = styled.div`
  min-height: 84px;
  background: linear-gradient(111.68deg, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%);
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
  background-color: transparent;
  border: 2px solid rgb(3, 63, 89);
  box-shadow: none;
  color: rgb(3, 63, 89);
`
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
  color: rgb(3, 63, 89);
`
const StyledText = styled(Text)`
  color: rgb(69, 42, 122);
  line-height: 1.5;
  text-transform: uppercase;
  font-weight: 600;
`
const IroWithdraw = () => {

    return (
        <StyledCard>
          <WrapperHeader >
            <Flex flexDirection="column" >  
                <StyledHeading>
                    Withdraw
                </StyledHeading>
            </Flex>
          </WrapperHeader>
          <WrapperBody>
            <StyledText fontSize='12px'>
              WITHDRAWABLE
            </StyledText >
            <StyledText fontSize='20px' mr='sm'>
              0.000
            </StyledText>
            <StyledText fontSize='12px'>
              RECEIVED
            </StyledText>
            <StyledText fontSize='20px' mr='sm'>
              0.000
            </StyledText>
            <RowItem>
              <Text fontSize='16px'> Price per DUCK </Text>
              <StyledText fontSize='16px'> $0.1 </StyledText>
            </RowItem> 
            <RowItem>
              <Text fontSize='16px'> Listing Price </Text>
              <StyledText fontSize='16px'> $0.1 </StyledText>
            </RowItem>
            <RowItem>
              <Text fontSize='16px'> Total Raised (USD) </Text>
              <StyledText fontSize='16px'> $0 </StyledText>
            </RowItem>
            <RowItem>
              <Text fontSize='16px'> Farming Starts </Text>
              <StyledText fontSize='16px'> #8062015 </StyledText>
            </RowItem>
            <RowItem>
              <Text fontSize='16px'> Withdraw Starts </Text>
              <StyledText fontSize='16px'> Jun 6 23:00 </StyledText>
            </RowItem>
          <Spacer size='md' />
          <Button width='100%'> Withdraw DUCK </Button>
          </WrapperBody>
        </StyledCard>
    )

}

export default IroWithdraw

