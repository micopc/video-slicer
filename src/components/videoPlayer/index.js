import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import videoAsset from '../../assets/video.mp4'
import { Container, VideoContainer, Video, LoadingOverlay } from './style'
import Playlist from './components/playlist'

const ORIGINAL_VIDEO = {
  id: 'ORIGINAL_VIDEO',
  name: 'Original',
  start: 0
}

class VideoPlayer extends React.Component {
  state = {
    clips: this.loadClips(),
    activeClip: ORIGINAL_VIDEO,
    videoDuration: 0,
    loading: false,
    shouldAutoPlay: false
  }

  videoEndReached = false

  componentDidMount() {
    this.setAutoPlay()
  }

  setAutoPlay = () => {
    this.setState({ shouldAutoPlay: true })
  }

  loadClips() {
    const storedClips = localStorage.getItem('clips')
    if (!storedClips) {
      return []
    }

    return JSON.parse(storedClips)
  }

  saveClips(clips) {
    localStorage.setItem('clips', JSON.stringify(clips))
  }

  onAddClip = clip => {
    const newClips = [...this.state.clips, clip]

    this.saveClips(newClips)

    this.setState({ clips: newClips })
  }

  onRemoveClip = index => {
    const { clips, activeClip } = this.state

    const newClips = [...clips.slice(0, index), ...clips.slice(index + 1)]

    this.saveClips(newClips)

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

    this.saveClips(newClips)

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

  onVideoPlay = e => {
    console.log('play')
    this.videoEndReached = false
  }

  // onVideoTimeUpdate runs while the clips are playing.
  // When the end of the current clip is reached
  // A loading overlay is shown for 3 seconds and then the next video is played
  // It was necessary since the HTML5 video event "onEnded" only works for the whole video not fragments
  onVideoTimeUpdate = e => {
    console.log('end', this.videoEndReached)
    const currentTime = Math.floor(e.target.currentTime)

    if (currentTime >= this.state.activeClip.end && !this.videoEndReached) {
      this.videoEndReached = true

      this.playNextVideo()
    }
  }

  onVideoEnded = e => {
    this.videoEndReached = true

    this.playNextVideo()
  }

  playNextVideo = () => {
    this.setState({ loading: true }, () => {
      setTimeout(() => {
        const { activeClip, clips } = this.state

        const activeIndex = clips.findIndex(clip => clip.id === activeClip.id)

        if (activeIndex === clips.length - 1) {
          this.setState({ loading: false, activeClip: ORIGINAL_VIDEO })
          return
        }

        if (activeIndex === -1) {
          this.setState({ loading: false, activeClip: clips[0] })
          return
        }

        this.setState({ loading: false, activeClip: clips[clips.length - 1] })
      }, 5000)
    })
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
    const {
      clips,
      activeClip,
      videoDuration,
      loading,
      shouldAutoPlay
    } = this.state

    const videoSrc = this.getVideoSrc()

    return (
      <Container>
        <VideoContainer>
          <Video
            key={videoSrc}
            controls
            autoPlay={shouldAutoPlay}
            onPlay={this.onVideoPlay}
            onDurationChange={this.onVideoDurationChange}
            onTimeUpdate={this.onVideoTimeUpdate}
            onEnded={this.onVideoEnded}
          >
            <source src={videoSrc} />
            Sorry, your browser doesn't support embedded videos.
          </Video>
          {loading && (
            <LoadingOverlay>
              <FontAwesomeIcon icon={faSpinner} color="#fff" pulse size="3x" />
              <p>The next clip will start soon</p>
            </LoadingOverlay>
          )}
        </VideoContainer>
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
