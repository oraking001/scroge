import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text, Link, Card } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { useWeb3React } from '@web3-react/core'
import Collapsible from 'react-collapsible';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SunburstSvg from './SunburstSvg'
import CompositeImage from './CompositeImage'
import { faqData } from '../../../faqUitls';
import './faq.css';


const BgWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`

const StyledSunburst = styled(SunburstSvg)`
  height: 350%;
  width: 350%;

  ${({ theme }) => theme.mediaQueries.xl} {
    height: 400%;
    width: 400%;
  }
`

const Wrapper = styled(Flex)`
  z-index: 1;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const FloatingPancakesWrapper = styled(Container)`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    visibility: visible;
  }
`

const TopLeftImgWrapper = styled(Flex)`
  position: absolute;
  left: 0;
  top: 0;
`

const BottomRightImgWrapper = styled(Flex)`
  position: absolute;
  right: 0;
  bottom: 0;
`

const WrapperHeader = styled.div`
  min-height: 84px;
  background: linear-gradient(111.68deg, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%);
  padding: 24px;
`

const StyledHeading = styled(Heading)`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
`


const topLeftImage = {
  path: '/images/home/flying-pancakes/',
  attributes: [
    { src: '1-bottom', alt: 'Pancake flying on the bottom' },
    { src: '1-left', alt: 'Pancake flying on the left' },
    { src: '1-top', alt: 'Pancake flying on the top' },
  ],
}

const bottomRightImage = {
  path: '/images/home/flying-pancakes/',
  attributes: [
    { src: '2-bottom', alt: 'Pancake flying on the bottom' },
    { src: '2-top', alt: 'Pancake flying on the top' },
    { src: '2-right', alt: 'Pancake flying on the right' },
  ],
}

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
  max-width: 100%;
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

const WrapperBody = styled.div`
  font-weight: 600 !important;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin: auto;
    padding: 24px;
  }
`
// line-height: 1.5;
// text-transform: uppercase;
// font-weight: 600;
const StyledText = styled(Text)`
  margin-left: 30px;
`

const styleText = {
  margin: "30px",
  color: "#1a2441",
}


const FAQHome = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>
      <BgWrapper>
        <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
          <StyledSunburst />
        </Flex>
      </BgWrapper>
      <FloatingPancakesWrapper>
        <TopLeftImgWrapper>
          <CompositeImage {...topLeftImage} maxHeight="256px" />
        </TopLeftImgWrapper>
        <BottomRightImgWrapper>
          <CompositeImage {...bottomRightImage} maxHeight="256px" />
        </BottomRightImgWrapper>
      </FloatingPancakesWrapper>
      <Wrapper>
      <StyledCard>
        <WrapperHeader >
          <Flex flexDirection="column" >  
            <StyledHeading>
              FAQ
            </StyledHeading>
          </Flex>
        </WrapperHeader>
        <WrapperBody>
          <Collapsible trigger = "What is Petpals NFT? " triggerStyle = {styleText}>
            <StyledText> Minters will be able to use their NFTs as in-game assets on the Petpals BSC Play-to-Earn game. </StyledText>
          </Collapsible>
          <Collapsible trigger = "Where do my Crypto Dogs Live ? " triggerStyle = {styleText}>
            <StyledText> Dogs are stored as ERC-721 tokens on the BSC blockchain and hosted on IPFS. Your Dogs live on the address of your connected wallet. </StyledText>
          </Collapsible>
          <Collapsible trigger = "What is Petpals NFT? " triggerStyle = {styleText}>
            <StyledText> In the name of fairness, Dogs have no price tiers and are all initially priced at a flat rate of 0.3 BNB each. </StyledText>
          </Collapsible>
        </WrapperBody>
      </StyledCard>
      </Wrapper>
    </>
  )
}



export default FAQHome

