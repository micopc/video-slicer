import React from 'react'
import videoAsset from '../../assets/video.mp4'
import { Container, Video } from './style'
import Playlist from './components/playlist'

const ORIGINAL_VIDEO = {
  id: 'ORIGINAL_VIDEO',
  name: 'Original',
  start: 0
}

class VideoPlayer extends React.Component {
  state = {
    clips: [],
    activeClip: ORIGINAL_VIDEO,
    videoDuration: 0
  }

  onAddClip = clip => {
    this.setState({ clips: [...this.state.clips, clip] })
  }

  onRemoveClip = index => {
    const { clips, activeClip } = this.state

    const newClips = [...clips.slice(0, index), ...clips.slice(index + 1)]

    const newState = { clips: newClips }

    // If the active video is deleted, then make the original video the active
    if (clips[index].id === activeClip.id) {
      newState.activeClip = ORIGINAL_VIDEO
    }

    this.setState(newState)
  }

  onEditClip = (index, clip) => {
    const { clips, activeClip } = this.state

    const newClips = [...clips.slice(0, index), clip, ...clips.slice(index + 1)]

    const newState = { clips: newClips }

    // If the active video is edited, then reassignit
    // to state in order to change start and end marks
    if (clip.id === activeClip.id) {
      newState.activeClip = clip
    }

    this.setState(newState)
  }

  onClipChange = activeClip => {
    this.setState({ activeClip })
  }

  onVideoDurationChange = e => {
    this.setState({ videoDuration: Math.round(e.target.duration) })
  }

  getVideoSrc = () => {
    const { activeClip } = this.state

    if (activeClip.start === 0) {
      return videoAsset
    }

    if (!activeClip.end) {
      return `${videoAsset}#t=${activeClip.start}`
    }

    return `${videoAsset}#t=${activeClip.start},${activeClip.end}`
  }

  render() {
    const { clips, activeClip, videoDuration } = this.state

    const videoSrc = this.getVideoSrc()

    return (
      <Container>
        <Video
          key={videoSrc}
          controls
          onDurationChange={this.onVideoDurationChange}
        >
          <source src={videoSrc} />
          Sorry, your browser doesn't support embedded videos.
        </Video>
        <Playlist
          originalVideo={ORIGINAL_VIDEO}
          videoDuration={videoDuration}
          clips={clips}
          activeClip={activeClip}
          onAddClip={this.onAddClip}
          onRemoveClip={this.onRemoveClip}
          onEditClip={this.onEditClip}
          onClipChange={this.onClipChange}
        />
      </Container>
    )
  }
}

export default VideoPlayer
