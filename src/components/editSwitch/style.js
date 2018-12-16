import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`

export const Switcher = styled.div`
  display: flex;
`

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: ${props => (props.active ? '#fff' : '#ff565c')};
  background-color: ${props => (props.active ? '#ff565c' : '#fff')};
  border: 1px solid #ff565c;
  box-shadow: none;
  -webkit-appearance: none;
  cursor: pointer;
`
