import React from 'react'
import { Label, LabelText, StyledInput } from './style'

export const Input = ({ label, ...props }) => (
  <Label>
    <LabelText>{label}</LabelText>
    <StyledInput {...props} />
  </Label>
)
