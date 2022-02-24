import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import {
  Modal,
  Text,
  Flex,
  Image,
  Button,
  Slider,
  BalanceInput,
  AutoRenewIcon,
  Link,
} from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { BUSD } from 'config/constants/tokens'
import { getFullDisplayBalance, formatNumber, getDecimalAmount } from 'utils/formatBalance'
import { usePresale } from 'hooks/useContract'
import PercentageButton from './PercentageButton'
import buyToken from '../hooks/useBuyToken'


interface StakeModalProps {
  tokenAddress: string
  stakingLimit: BigNumber
  balance: BigNumber
  stakingTokenPrice: number
  isRemovingStake?: boolean
  onDismiss?: () => void
}

const StyledLink = styled(Link)`
  width: 100%;
`

const StakeModal: React.FC<StakeModalProps> = ({
  tokenAddress,
  stakingLimit,
  balance,
  stakingTokenPrice,
  isRemovingStake = false,
  onDismiss,
}) => {
  const stakingToken = BUSD[56]
  const userData = useMemo(()=>{
    return {
      stakedBalance: new BigNumber(0),
      stakingTokenBalance: balance
    }
  }, [balance])
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const [stakeAmount, setStakeAmount] = useState('')
  const [hasReachedStakeLimit, setHasReachedStakedLimit] = useState(false)
  const [percent, setPercent] = useState(0)
  const getCalculatedStakingLimit = () => {
    if (isRemovingStake) {
      return userData.stakedBalance
    }
    return stakingLimit.gt(0) && userData.stakingTokenBalance.gt(stakingLimit) ? stakingLimit : userData.stakingTokenBalance
  }
  const fullDecimalStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingToken.decimals)
  const userNotEnoughToken = isRemovingStake
    ? userData.stakedBalance.lt(fullDecimalStakeAmount)
    : userData.stakingTokenBalance.lt(fullDecimalStakeAmount)

  const usdValueStaked = new BigNumber(stakeAmount).times(stakingTokenPrice)
  const formattedUsdValueStaked = !usdValueStaked.isNaN() && formatNumber(usdValueStaked.toNumber())

  const getTokenLink = stakingToken.address ? `/swap?outputCurrency=${stakingToken.address}` : '/swap'

  useEffect(() => {
    if (stakingLimit.gt(0) && !isRemovingStake) {
      setHasReachedStakedLimit(fullDecimalStakeAmount.plus(userData.stakedBalance).gt(stakingLimit))
    }
  }, [
    stakeAmount,
    stakingLimit,
    userData,
    stakingToken,
    isRemovingStake,
    setHasReachedStakedLimit,
    fullDecimalStakeAmount,
  ])

  const handleStakeInputChange = (input: string) => {
    if (input) {
      const convertedInput = getDecimalAmount(new BigNumber(input), stakingToken.decimals)
      const percentage = Math.floor(convertedInput.dividedBy(getCalculatedStakingLimit()).multipliedBy(100).toNumber())
      setPercent(Math.min(percentage, 100))
    } else {
      setPercent(0)
    }
    setStakeAmount(input)
  }

  const handleChangePercent = (sliderPercent: number) => {
    if (sliderPercent > 0) {
      const percentageOfStakingMax = getCalculatedStakingLimit().dividedBy(100).multipliedBy(sliderPercent)
      const amountToStake = getFullDisplayBalance(percentageOfStakingMax, stakingToken.decimals, stakingToken.decimals)
      setStakeAmount(amountToStake)
    } else {
      setStakeAmount('')
    }
    setPercent(sliderPercent)
  }
  const { account } = useActiveWeb3React()
  const presaleContract = usePresale()
  const handleConfirmClick = async () => {
    setPendingTx(true)
    try {
        // staking
        // await onStake(stakeAmount, stakingToken.decimals)
        await buyToken(presaleContract, stakeAmount, account,  stakingToken.decimals)
        toastSuccess(
          `${t('Baught')}!`,
          t('You baught SPC with'),
        )
      setPendingTx(false)
      onDismiss()
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }

  console.log('debug stakingLimit', stakingLimit.toString())
  return (
    <Modal
      minWidth="346px"
      title={isRemovingStake ? t('Unstake') : t('Buy SPC with BUSD')}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      {stakingLimit.gt(0) && !isRemovingStake && (
        <Text color="secondary" bold mb="24px" style={{ textAlign: 'center' }} fontSize="16px">
          {t('Max stake for this pool: %amount% %token%', {
            amount: getFullDisplayBalance(new BigNumber(stakingLimit.toString()), stakingToken.decimals, 0),
            token: stakingToken.symbol,
          })}
        </Text>
      )}
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>{isRemovingStake ? t('Unstake') : t('Buy')}:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Image
            src={`/images/tokens/${stakingToken.address}.png`}
            width={24}
            height={24}
            alt={stakingToken.symbol}
          />
          <Text ml="4px" bold>
            {stakingToken.symbol}
          </Text>
        </Flex>
      </Flex>
      <BalanceInput
        value={stakeAmount}
        onUserInput={handleStakeInputChange}
        currencyValue={stakingTokenPrice !== 0 && `~${formattedUsdValueStaked || 0} USD`}
        isWarning={hasReachedStakeLimit || userNotEnoughToken}
        decimals={stakingToken.decimals}
      />
      {hasReachedStakeLimit && (
        <Text color="failure" fontSize="12px" style={{ textAlign: 'right' }} mt="4px">
          {t('Maximum total amount: %amount% %token%', {
            amount: getFullDisplayBalance(new BigNumber(stakingLimit), stakingToken.decimals, 0),
            token: stakingToken.symbol,
          })}
        </Text>
      )}
      {userNotEnoughToken && (
        <Text color="failure" fontSize="12px" style={{ textAlign: 'right' }} mt="4px">
          {t('Insufficient %symbol% balance', {
            symbol: stakingToken.symbol,
          })}
        </Text>
      )}
      <Text ml="auto" color="textSubtle" fontSize="12px" mb="8px">
        {t('Balance: %balance%', {
          balance: getFullDisplayBalance(getCalculatedStakingLimit(), stakingToken.decimals),
        })}
      </Text>
      <Slider
        min={0}
        max={100}
        value={percent}
        onValueChanged={handleChangePercent}
        name="buy"
        valueLabel={`${percent}%`}
        step={1}
      />
      <Flex alignItems="center" justifyContent="space-between" mt="8px">
        <PercentageButton onClick={() => handleChangePercent(25)}>25%</PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(50)}>50%</PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(75)}>75%</PercentageButton>
        <PercentageButton onClick={() => handleChangePercent(100)}>{t('Max')}</PercentageButton>
      </Flex>
      <Button
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
        onClick={handleConfirmClick}
        disabled={!stakeAmount || parseFloat(stakeAmount) === 0 || hasReachedStakeLimit || userNotEnoughToken}
        mt="24px"
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
      {!isRemovingStake && (
        <StyledLink external href={getTokenLink}>
          <Button width="100%" mt="8px" variant="secondary">
            {t('Get %symbol%', { symbol: stakingToken.symbol })}
          </Button>
        </StyledLink>
      )}
    </Modal>
  )
}

export default StakeModal
