export const FONTS = {
  family: {
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    semiBold: 'Montserrat-SemiBold',
    bold: 'Montserrat-Bold',
    light: 'Montserrat-Light',
    thin: 'Montserrat-Light', // Using Light as Thin since we don't have Thin
  },
  weights: {
    thin: '100',
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  },
} as const;

export const FONT_FAMILY = {
  regular: FONTS.family.regular,
  medium: FONTS.family.medium,
  semiBold: FONTS.family.semiBold,
  bold: FONTS.family.bold,
  light: FONTS.family.light,
  thin: FONTS.family.thin,
} as const;
