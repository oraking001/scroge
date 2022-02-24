import React from 'react'
import { Heading, Card } from '@pancakeswap/uikit'
import styled from 'styled-components'

const StyledPreSaleCard = styled(Card)`
    background: none;
    padding: 0px;
    border-radius: 32px;
`
const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  font-size: 2em;
  text-transform: uppercase;
  color: #9a6aff;
  text-align: center;
  margin: 10px auto 10px;
`

const ClaimTitle: React.FC = () => {
  return (
      <StyledPreSaleCard >
          <Title >YOU CAN CLAIM YOUR DUCK NOW! </Title>
      </StyledPreSaleCard>
  )
}

export default ClaimTitle
