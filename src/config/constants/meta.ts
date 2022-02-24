import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'ScrogeSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('ScrogeSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('ScrogeSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('ScrogeSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('ScrogeSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('ScrogeSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('ScrogeSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('ScrogeSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('ScrogeSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('ScrogeSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('ScrogeSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('ScrogeSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('ScrogeSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('ScrogeSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('ScrogeSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('ScrogeSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('ScrogeSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('ScrogeSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('ScrogeSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('ScrogeSwap Info & Analytics')}`,
        description: 'View statistics for ScrogeSwap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('ScrogeSwap Info & Analytics')}`,
        description: 'View statistics for ScrogeSwap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('ScrogeSwap Info & Analytics')}`,
        description: 'View statistics for ScrogeSwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('ScrogeSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('ScrogeSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('ScrogeSwap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('ScrogeSwap Squad')} | ${t('ScrogeSwap')}`,
      }
    default:
      return null
  }
}
