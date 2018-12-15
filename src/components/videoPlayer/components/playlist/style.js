import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #ebebeb;
  margin-top: 10px;
`

export const Header = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
`

export const ClipList = styled.ul`
  overflow-y: auto;
  height: 300px;
  margin: 0;
  padding: 0;
`

export const ClipItem = styled.li`
  padding: 10px 20px;
  ${props => props.active && 'background-color: #ff565c;'}
`

export const ClipItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
`

export const NowPlaying = styled.span`
  font-size: 10px;
  color: #fff;
`

export const ClipInfo = styled.div`
  flex: 1;
`

export const ClipName = styled.div`
  font-size: 14px;
  color: ${props => (props.active ? '#fff' : '#1d1f24')};
`

export const ClipTime = styled.div`
  font-size: 12px;
  color: ${props => (props.active ? '#fff' : '#1d1f24')};
  opacity: 0.6;
`

export const ClipActions = styled.div`
  padding-left: 10px;
  display: flex;
  width: 104px;
  justify-content: center;
`

export const Button = styled.button`
  padding: 5px;
  background-color: transparent;
  border: 0;
  box-shadow: none;
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 16px;
  margin: 0 5px;
`

export const NoClipsMessage = styled.p`
  color: #1d1f24;
  font-size: 12px;
  opacity: 0.6;
  margin: 20px;
`
