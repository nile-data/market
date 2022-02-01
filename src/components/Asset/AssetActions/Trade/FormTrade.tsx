import React, { ReactElement, useState } from 'react'
import {
  AmountsInMaxFee,
  AmountsOutMaxFee,
  Asset,
  LoggerInstance,
  Pool,
  TokenInOutMarket
} from '@oceanprotocol/lib'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Actions from '../Pool/Actions'
import { useUserPreferences } from '@context/UserPreferences'
import { toast } from 'react-toastify'
import Swap from './Swap'
import Alert from '@shared/atoms/Alert'
import styles from './FormTrade.module.css'
import Decimal from 'decimal.js'
import { useWeb3 } from '@context/Web3'
import { useAsset } from '@context/Asset'
import { FormTradeData } from './_types'
import { initialValues } from './_constants'
import content from '../../../../../content/price.json'

export default function FormTrade({
  ddo,
  balance,
  maxDt,
  maxBaseToken,
  price
}: {
  ddo: Asset
  balance: PoolBalance
  maxDt: string
  maxBaseToken: string
  price: BestPrice
}): ReactElement {
  const { web3, accountId } = useWeb3()
  const { isAssetNetwork } = useAsset()
  const { debug } = useUserPreferences()
  const [txId, setTxId] = useState<string>()
  const [coinFrom, setCoinFrom] = useState<string>('OCEAN')

  const [maximumBaseToken, setMaximumBaseToken] = useState(maxBaseToken)
  const [maximumDt, setMaximumDt] = useState(maxDt)
  const [isWarningAccepted, setIsWarningAccepted] = useState(false)

  const tokenAddress = ''
  const tokenSymbol = ''

  const validationSchema: Yup.SchemaOf<FormTradeData> = Yup.object()
    .shape({
      ocean: Yup.number()
        .max(
          Number(maximumBaseToken),
          (param) => `Must be less or equal to ${param.max}`
        )
        .min(0.001, (param) => `Must be more or equal to ${param.min}`)
        .required('Required')
        .nullable(),
      datatoken: Yup.number()
        .max(
          Number(maximumDt),
          (param) => `Must be less or equal to ${param.max}`
        )
        .min(0.00001, (param) => `Must be more or equal to ${param.min}`)
        .required('Required')
        .nullable(),
      type: Yup.string(),
      slippage: Yup.string()
    })
    .defined()

  async function handleTrade(values: FormTradeData) {
    if (!web3) return

    const poolInstance = new Pool(web3, LoggerInstance)
    const tokenInOutMarket: TokenInOutMarket = {
      tokenIn: '',
      tokenOut: '',
      marketFeeAddress: ''
    }
    const tokenOutMarket: TokenInOutMarket = {
      tokenIn: '',
      tokenOut: '',
      marketFeeAddress: ''
    }
    const swapMarketFee = await poolInstance.getSwapFee(price.address)

    try {
      const impact = new Decimal(
        new Decimal(100).sub(new Decimal(values.slippage))
      ).div(100)
      const precision = 15

      const amountsInOutMaxFee: AmountsInMaxFee = {
        tokenAmountIn: new Decimal(values.datatoken)
          .mul(impact)
          .toFixed(precision)
          .toString(),
        minAmountOut: '2',
        swapMarketFee: swapMarketFee
      }

      const amountsOutMaxFee: AmountsOutMaxFee = {
        maxAmountIn: '50',
        tokenAmountOut: new Decimal(values.ocean)
          .mul(impact)
          .toFixed(precision)
          .toString(),
        swapMarketFee: swapMarketFee
      }

      const tx =
        values.type === 'buy'
          ? await poolInstance.swapExactAmountIn(
              accountId,
              price.address,
              tokenInOutMarket,
              amountsInOutMaxFee
            )
          : await poolInstance.swapExactAmountOut(
              accountId,
              price.address,
              tokenOutMarket,
              amountsOutMaxFee
            )
      setTxId(tx?.transactionHash)
    } catch (error) {
      LoggerInstance.error(error.message)
      toast.error(error.message)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await handleTrade(values)
        resetForm()
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, submitForm, values, isValid }) => (
        <>
          {isWarningAccepted ? (
            <Swap
              ddo={ddo}
              balance={balance}
              maxDt={maxDt}
              maxBaseToken={maxBaseToken}
              price={price}
              setCoin={setCoinFrom}
              setMaximumBaseToken={setMaximumBaseToken}
              setMaximumDt={setMaximumDt}
            />
          ) : (
            <div className={styles.alertWrap}>
              <Alert
                text={content.trade.warning}
                state="info"
                action={{
                  name: 'I understand',
                  style: 'text',
                  handleAction: () => setIsWarningAccepted(true)
                }}
              />
            </div>
          )}
          <Actions
            isDisabled={
              !isValid ||
              !isWarningAccepted ||
              !isAssetNetwork ||
              values.datatoken === undefined ||
              values.ocean === undefined
            }
            isLoading={isSubmitting}
            loaderMessage="Swapping tokens..."
            successMessage="Successfully swapped tokens."
            actionName={content.trade.action}
            amount={
              values.type === 'sell'
                ? values.datatoken
                  ? `${values.datatoken}`
                  : undefined
                : values.ocean
                ? `${values.ocean}`
                : undefined
            }
            action={submitForm}
            txId={txId}
            tokenAddress={tokenAddress}
            tokenSymbol={tokenSymbol}
          />

          {debug && (
            <pre>
              <code>{JSON.stringify(values, null, 2)}</code>
            </pre>
          )}
        </>
      )}
    </Formik>
  )
}
