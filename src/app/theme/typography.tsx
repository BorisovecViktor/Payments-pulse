import { breakpointsTheme } from './breakpoints'

export const fontFamilyRoboto = 'Roboto, serif'

const h1 = {
  fontWeight: 900,
  fontSize: '1.625rem',
  lineHeight: '34px',
  [breakpointsTheme.breakpoints.up('sm')]: {
    fontSize: '2rem',
    lineHeight: '38px',
  },
  [breakpointsTheme.breakpoints.up('lg')]: {
    fontSize: '2.375rem',
    lineHeight: '46px',
  },
  [breakpointsTheme.breakpoints.up('xl')]: {
    fontSize: '2.75rem',
    lineHeight: '52px',
  },
} as const

const h2 = {
  fontWeight: 700,
  fontSize: '1.375rem',
  lineHeight: '28px',
  [breakpointsTheme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
    lineHeight: '30px',
  },
  [breakpointsTheme.breakpoints.up('lg')]: {
    fontSize: '1.75rem',
    lineHeight: '34px',
  },
  [breakpointsTheme.breakpoints.up('xl')]: {
    fontSize: '2rem',
    lineHeight: '38px',
  },
} as const

const h3 = {
  fontWeight: 700,
  fontSize: '1.125rem',
  lineHeight: '24px',
  [breakpointsTheme.breakpoints.up('sm')]: {
    fontSize: '1.125rem',
    lineHeight: '24px',
  },
  [breakpointsTheme.breakpoints.up('lg')]: {
    fontSize: '1.375rem',
    lineHeight: '28px',
  },
  [breakpointsTheme.breakpoints.up('xl')]: {
    fontSize: '1.375rem',
    lineHeight: '28px',
  },
} as const

const body1 = {
  fontSize: 14,
} as const

const body2 = {
  fontSize: 13,
} as const

export const typography = {
  fontFamily: fontFamilyRoboto,
  h1,
  h2,
  h3,
  body1,
  body2,
} as const
