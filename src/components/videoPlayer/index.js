import React from 'react'
import videoAsset from '../../assets/video.mp4'
import { Container, Video } from './style'
import Playlist from './components/playlist'

class VideoPlayer extends React.Component {
  state = {
    clips: [1]
  }

  onAddClipClick = () => {
    const newClip = this.state.clips.length + 1
    this.setState({ clips: [...this.state.clips, newClip] })
  }

  render() {
    const source = `${videoAsset}#t=0.1`
    const { clips } = this.state

    return (
      <Container>
        <Video src={source} controls>
          Tu navegador no admite el elemento <code>video</code>.
        </Video>
        <Playlist
          clips={clips}
          activeClip={1}
          onAddClip={this.onAddClipClick}
        />
      </Container>
    )
  }
}

export default VideoPlayer
