import React from 'react'
import Creatable from 'react-select/lib/Creatable'
import {
  StyledForm,
  Instructions,
  Label,
  LabelText,
  StyledInput,
  selectStyles,
  StyledButton
} from './style'

export const Form = ({ instructions, children, ...props }) => (
  <StyledForm {...props}>
    <Instructions>{instructions}</Instructions>
    {children}
  </StyledForm>
)

export const Input = ({ label, ...props }) => (
  <Label>
    <LabelText>{label}</LabelText>
    <StyledInput {...props} />
  </Label>
)

export const CreatableSelect = ({ label, ...props }) => (
  <Label>
    <LabelText>{label}</LabelText>
    <Creatable styles={selectStyles} {...props} />
  </Label>
)

export const Button = props => <StyledButton {...props} />
