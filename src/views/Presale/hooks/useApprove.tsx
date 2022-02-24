import React, { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers, Contract } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/actions'
import { useTranslation } from 'contexts/Localization'
import { useCake, useSousChef, useCakeVaultContract, usePresale } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import useLastUpdated from 'hooks/useLastUpdated'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'

export const useApprovePresale = (lpContract: Contract) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const presaleContract = usePresale()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await callWithGasPrice(lpContract, 'approve', [presaleContract.address, ethers.constants.MaxUint256])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('You can now buy SPC with BUSD!')}
          </ToastDescriptionWithTx>,
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }, [
    lpContract,
    presaleContract,
    t,
    toastError,
    toastSuccess,
    callWithGasPrice,
  ])

  return { handleApprove, requestedApproval }
}