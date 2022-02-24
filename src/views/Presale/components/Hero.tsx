import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  margin-bottom: 24px;
  // margin-top: 24px
  color: rgb(103, 227, 192);
  font-size: 3em;
  text-transform: uppercase;
`

const Blurb = styled(Text)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  // background-image: linear-gradient(180deg, #53dee9 0%, #1fc7d4 100%);
  // background-image: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-bottom: 40px;
  padding-top: 0px;
  display: flex;
  flex-direction: row;
`

const StyledContainer = styled(Container)`
  flex: 1;
  padding-right: 0;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`
const imagePath = '/images/'
const imageSrc = 'duck'
const Hero = () => {

  return (
    <StyledHero>
      <StyledContainer>
      <Title>P R E S A L E !</Title>
      {/* <img src={`${imagePath}${imageSrc}.png`} width="100%" height="100%" alt='imasdfge' /> */}
        {/* <Blurb>{TranslateString(999, `Share the referral link below to invite your friends and earn 3% of your friends' earnings FOREVER!`)}</Blurb> */}
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero
