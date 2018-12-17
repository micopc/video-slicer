import styled from 'styled-components'

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
`

export const NavigationContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  & p {
    flex: 1;
    margin: 0 0 5px 0;
    opacity: 0.4;
    font-size: 12px;
    display: none;

    @media (min-width: 576px) {
      display: block;
    }
  }
`

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
`

export const Video = styled.video`
  width: 100%;
  height: auto;
`

export const PlaylistContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
  border: 1px solid #ebebeb;
`

export const PlaylistHeader = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px 20px;
  border-bottom: 1px solid #ebebeb;
`

export const PlaylistHeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const PlaylistAutoplay = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;

  & label {
    display: flex;
    align-items: center;
  }

  & label span {
    margin-right: 10px;
  }
`

export const PlaylistTitle = styled.h2`
  flex: 1;
  color: #1d1f24;
  font-size: 18px;
  margin: 0;
`

export const VideoOverlay = styled.div`
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

export const Button = styled.button`
  padding: 5px;
  background-color: transparent;
  border: 0;
  box-shadow: none;
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 14px;
  margin: 0 5px;
`
