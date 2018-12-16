import styled from 'styled-components'

export const StyledForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Instructions = styled.p`
  color: #1d1f24;
  margin: 0 0 20px;
`

export const Label = styled.label`
  width: 100%;
  font-size: 14px;
  color: #1d1f24;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

export const LabelText = styled.span`
  margin: 0 0 5px 5px;
`

export const StyledInput = styled.input`
  border: 1px solid #e9e9e9;
  padding: 12px;
  font-size: 14px;
  color: #1d1f24;
`

export const selectStyles = {
  control: base => ({
    ...base,
    border: '1px solid #e9e9e9'
  })
}

export const StyledButton = styled.button`
  padding: 5px;
  background-color: transparent;

  border: 0;
  box-shadow: none;
  -webkit-appearance: none;
  cursor: pointer;
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  margin: 10px;

  color: ${props => (props.primary ? '#ff565c' : '#bbbbbd')};

  &:disabled {
    opacity: 0.4;
  }
`
