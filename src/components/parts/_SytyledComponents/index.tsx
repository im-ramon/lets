import styled from 'styled-components/native'
import { THEME } from '../../../theme'

export const FieldAreaStyled = styled.View`
    width: 100%;
    margin-bottom: 32px;
    vertical-align: top;
    `

export const InputStyled = styled.TextInput`
  background-color: ${THEME.COLORS['DARK'].BACKGROUND_2};
  border-bottom-width: 1px;
  border-bottom-color: ${THEME.COLORS['DARK'].PRIMARY};
  font-family: ${THEME.FONT_FAMILY.REGULAR};
  height: 40px;
  padding-left: 8px;
  padding-right: 32px;
  color: ${THEME.COLORS['DARK'].TEXT};
`
export const DatePickerStyledContainer = styled.TouchableOpacity`
  background-color: ${THEME.COLORS['DARK'].BACKGROUND_2};
  width: 46%;
  border-bottom-width: 1px;
  border-bottom-color: ${THEME.COLORS['DARK'].PRIMARY};
  font-family: ${THEME.FONT_FAMILY.REGULAR};
  height: 40px;
  padding-left: 8px;
  padding-right: 32px;
  align-items: center;
  flex-direction: row;
  color: ${THEME.COLORS['DARK'].TEXT};
`

export const TextAreaStyled = styled.TextInput`
  background-color: ${THEME.COLORS['DARK'].BACKGROUND_2};
  border-bottom-width: 1px;
  border-bottom-color: ${THEME.COLORS['DARK'].PRIMARY};
  font-family: ${THEME.FONT_FAMILY.REGULAR};
  height: 40px;
  padding-left: 8px;
  padding-right: 8px;
  color: ${THEME.COLORS['DARK'].TEXT};
  height: 250px;
`

export const LabelStyled = styled.Text`
    color: ${THEME.COLORS['DARK'].TEXT};
    margin-bottom: 8px;
    font-family: ${THEME.FONT_FAMILY.REGULAR};
    padding-left: 8px;
    text-align: justify;
`

export const FormStyled = styled.View`
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
`

export const PageContainerView = styled.View`
        flex: 1;
        width: 100%;
        padding-top: 32px;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        `

export const PageScrollViewContainer = styled.View`
        flex: 1;
        width: 100%;
        padding-top: 32px;
        padding-left: 16px;
        padding-right: 16px;
`