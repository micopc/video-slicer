import styled from 'styled-components'

export const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
`

export const VideoContainer = styled.div`
  position: relative;
`

export const Video = styled.video`
  width: 100%;
  height: auto;
`

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
`
