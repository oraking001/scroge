import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { Flex, Heading, Button, Card, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useTheme from 'hooks/useTheme'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'
import CompositeImage, { getSrcSet, CompositeImageProps } from './CompositeImage'
import getLeftTime from '../../../utils/getLeftTime'


const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }  
`

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }  
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const BunnyWrapper = styled.div`
  width: 100%;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
`

const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`
const StyledCard=styled(Card)`
  display: flex;
  margin-top: 24px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 340px;
    height: 179px;
    margin-top: 24px;
  }
`
const WrapperHeading=styled.div`
  background: linear-gradient(
  111.68deg, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%);
      border-radius: 24px 24px 0px 0px;
      padding: 24px;
`
const WrapperBody=styled.div`
  padding: 24px;
`
const RowItem = styled.div`
  display: flex;
  text-align: center;
`
const Wrapper3=styled.div`
    width: 33%
`
const StyledLine = styled.div`
  height: 50px;
  width: 1px;
  border-left: 1px;
  background-color: rgb(40, 13, 95);
`

const imagePath = '/images/home/lunar-bunny/'
const imageSrc = 'bunny'

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [
    { src: 'star-l', alt: '3D Star' },
    { src: 'star-r', alt: '3D Star' },
    { src: 'star-top-r', alt: '3D Star' },
  ],
}

const StyledButton = styled(Button)`
  color: #1a2441;
`
const presaleDate = new Date( "November 1, 2021 00:00:00" );

const Hero = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { theme } = useTheme()
  const [provider, setProvider] = useState({leftDays: 0, leftHours: 0, leftMinutes: 0})
  const nowMinute = Date.now() / 60000

  useEffect(() => {
    const val = {leftDays: 0, leftHours: 0, leftMinutes: 0}
    const remainSeconds = (presaleDate.getTime() /1000 - nowMinute * 60)
    const {days, hours, minutes} = getLeftTime(remainSeconds)
    val.leftDays = days;
    val.leftHours = hours;
    val.leftMinutes = minutes;
    setProvider(val)
  }, [nowMinute])

  return (
    <>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={[account ? '280px' : '50px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column">
          <Heading scale="xxl" color="secondary" mb="24px">
            {t('Scrooge Swap')}
          </Heading>
          <Heading scale="md" mb="24px">
            {t('Trade, earn, and win crypto on the most popular decentralized platform in the galaxy.')}
          </Heading>
          <Flex>
            {!account && <ConnectWalletButton mr="8px" />}
            <a href="https://t.me/scroogeswap_bot">
              <StyledButton variant='primary' marginLeft='24px' >{t('Presale')}</StyledButton>
            </a>
            <Link to="/">
              <StyledButton color='#1a2441' variant='primary' marginLeft='24px' >{t('AirDrop')}</StyledButton>
            </Link>
          </Flex>
          <StyledCard > 
            <WrapperHeading>
              <Heading> Presale Starts in</Heading>
            </WrapperHeading>
            <WrapperBody>
              <RowItem>
                <Wrapper3>
                  <Text fontSize='20px'> { provider.leftDays } </Text>
                  <Text fontSize='20px'> Days </Text>
                </Wrapper3>
                <StyledLine />
                <Wrapper3>
                  <Text fontSize='20px'> { provider.leftHours } </Text>
                  <Text fontSize='20px'> Hours </Text>
                </Wrapper3>
                <StyledLine />
                <Wrapper3>
                  <Text fontSize='20px'> { provider.leftMinutes } </Text>
                  <Text fontSize='20px'> Minutes </Text>
                </Wrapper3>
              </RowItem>
            </WrapperBody>
           </StyledCard>
        </Flex>
        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
        >
          <BunnyWrapper>
            <img src={`${imagePath}${imageSrc}.png`} srcSet={getSrcSet(imagePath, imageSrc)} alt={t('Lunar bunny')} />
          </BunnyWrapper>
          <StarsWrapper>
            <CompositeImage {...starsImage} />
          </StarsWrapper>
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
