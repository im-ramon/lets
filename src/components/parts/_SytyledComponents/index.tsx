import styled from 'styled-components/native'
import { THEME } from '../../../theme'

export const FieldAreaStyled = styled.View`
    width: 100%;
    margin-bottom: 32px;
    vertical-align: top;
`

export const InputStyled = styled.TextInput`
  background-color: ${THEME.COLORS.BACKGROUND_2};
  border-bottom-width: 1px;
  border-bottom-color: ${THEME.COLORS.PRIMARY};
  height: 40px;
  padding-left: 8px;
  padding-right: 8px;
  color: ${THEME.COLORS.TEXT};
`
export const TextAreaStyled = styled.TextInput`
  background-color: ${THEME.COLORS.BACKGROUND_2};
  border-bottom-width: 1px;
  border-bottom-color: ${THEME.COLORS.PRIMARY};
  height: 40px;
  padding-left: 8px;
  padding-right: 8px;
  color: ${THEME.COLORS.TEXT};
  height: 250px;
`

export const LabelStyled = styled.Text`
    color: ${THEME.COLORS.TEXT};
    margin-bottom: 8px;
    font-family: ${THEME.FONT_FAMILY.REGULAR};
    padding-left: 8px;
`

export const FormStyled = styled.View`
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
`