import React from 'react'
import Switch from 'react-switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
  faFilter,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import videoAsset from '../../assets/video.mp4'
import {
  Container,
  NavigationContainer,
  VideoContainer,
  Video,
  PlaylistContainer,
  PlaylistHeader,
  PlaylistHeaderBar,
  PlaylistAutoplay,
  PlaylistTitle,
  Button,
  VideoOverlay
} from './style'
import Modal from '../modals/modalRoot'
import Playlist from './components/playlist'

// Original Video data
const ORIGINAL_VIDEO = {
  id: 'ORIGINAL_VIDEO',
  name: 'Original',
  start: 0
}

// How much time the app will wait until it okays the next clip
const AUTOPLAY_DELAY = 3000

class VideoPlayer extends React.Component {
  state = {
    clips: this.loadClips(),
    activeClip: ORIGINAL_VIDEO,
    videoDuration: 0,
    loading: false,
    autoPlay: false,
    filters: []
  }

  // Flag that prevent the video update event from being
  // called multiple times and trigger multiple autoplay timers
  videoEndReached = false

  // Flag that holds the autoplay timeout so it can be stopped on demand
  autoplayTimer = null

  componentDidMount() {
    document.addEventListener('keydown', e => {
      switch (e.key) {
        case 'Left':
        case 'ArrowLeft':
          this.onPrevClip()
          break
        case 'Right':
        case 'ArrowRight':
          this.onNextClip()
          break
        default:
          return
      }
    })
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

  onAutoPlayChange = autoPlay => this.setState({ autoPlay })

  onAddClip = clip => {
    const newClips = [...this.state.clips, clip]

    this.saveClips(newClips)

    this.setState({ clips: newClips })
  }

  onApplyFilters = filters => {
    this.setState({ filters })
  }

  onRemoveClip = index => {
    const { clips, activeClip } = this.state

    const newClips = [...clips.slice(0, index), ...clips.slice(index + 1)]

    this.saveClips(newClips)

    const newState = { clips: newClips }

    // If the active video is deleted, then make the original video the active
    if (clips[index].id === activeClip.id) {
      newState.activeClip = ORIGINAL_VIDEO
      newState.loading = false
    }

    this.setState(newState)
  }

  onEditClip = (clipIndex, newClip) => {
    const { clips, activeClip } = this.state

    const newClips = [
      ...clips.slice(0, clipIndex),
      newClip,
      ...clips.slice(clipIndex + 1)
    ]

    this.saveClips(newClips)

    const newState = { clips: newClips }

    // If the active video is edited, then reassign it
    // to state in order to change start and end marks
    if (newClip.id === activeClip.id) {
      newState.activeClip = newClip
    }

    this.setState(newState)
  }

  onClipChange = activeClip => {
    this.setState({ activeClip, loading: false })
  }

  onVideoDurationChange = e => {
    this.setState({ videoDuration: Math.round(e.target.duration) })
  }

  onVideoPlay = e => {
    this.videoEndReached = false
  }

  // onVideoTimeUpdate runs while the clips are playing.
  // When the end of the current clip is reached
  // A loading overlay is shown for 3 seconds and then the next video is played
  // It was necessary since the HTML5 video event "onEnded" only works for the whole video not fragments
  onVideoTimeUpdate = e => {
    const currentTime = Math.floor(e.target.currentTime)

    if (currentTime >= this.state.activeClip.end && !this.videoEndReached) {
      this.videoEndReached = true

      if (this.state.autoPlay) {
        this.playNextClip()
      }
    }
  }

  onVideoEnded = e => {
    this.videoEndReached = true

    if (this.state.autoPlay) {
      this.playNextClip()
    }
  }

  onNextClip = () => {
    const clip = this.getNextClip()

    // If the next video is currently being loaded, stop it
    this.autoplayTimer && clearTimeout(this.autoplayTimer)

    this.onClipChange(clip)
  }

  onPrevClip = () => {
    const clip = this.getPrevClip()

    // If the next video is currently being loaded, stop it
    this.autoplayTimer && clearTimeout(this.autoplayTimer)

    this.onClipChange(clip)
  }

  getPrevClip = () => {
    const { activeClip, clips } = this.state

    if (clips.length === 0) {
      return ORIGINAL_VIDEO
    }

    const activeIndex = clips.findIndex(clip => clip.id === activeClip.id)

    if (activeIndex === -1) {
      return clips[clips.length - 1]
    }

    if (activeIndex === 0) {
      return ORIGINAL_VIDEO
    }

    return clips[activeIndex - 1]
  }

  getNextClip = () => {
    const { activeClip, clips } = this.state

    if (clips.length === 0) {
      return ORIGINAL_VIDEO
    }

    const activeIndex = clips.findIndex(clip => clip.id === activeClip.id)

    if (activeIndex === -1) {
      return clips[0]
    }

    if (activeIndex === clips.length - 1) {
      return ORIGINAL_VIDEO
    }

    return clips[activeIndex + 1]
  }

  playNextClip = () => {
    this.setState({ loading: true }, () => {
      this.autoplayTimer = setTimeout(() => {
        const clip = this.getNextClip()

        this.onClipChange(clip)
      }, AUTOPLAY_DELAY)
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

  getAllVideoTags = () => {
    const { clips } = this.state

    // Group all tags in a set in order to avoid duplicates
    const tags = clips.reduce((accumulator, currentClip) => {
      if (currentClip.tags) {
        currentClip.tags.forEach(tag => {
          accumulator.add(tag)
        })
      }

      return accumulator
    }, new Set())

    // return tags as array for easier iteration
    return Array.from(tags)
  }

  render() {
    const {
      clips,
      activeClip,
      videoDuration,
      loading,
      autoPlay,
      filters
    } = this.state
    const { canEdit } = this.props

    const videoSrc = this.getVideoSrc()

    const tags = this.getAllVideoTags()

    const isFiltering = filters.length === 0

    let filteredClips = []
    if (isFiltering) {
      filteredClips = clips
    } else {
      filteredClips = clips.filter(clip => {
        return filters.some(
          filter => clip.tags && clip.tags.some(tag => tag === filter)
        )
      })
    }

    return (
      <Modal>
        {({ openModal }) => (
          <Container>
            <NavigationContainer>
              <p>
                You can also navigate between next and previous clips with your
                keyboard arrows
              </p>
              <Button onClick={this.onPrevClip}>
                <FontAwesomeIcon icon={faArrowLeft} color="#1d1f24" size="xs" />{' '}
                prev
              </Button>
              <Button onClick={this.onNextClip}>
                next{' '}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  color="#1d1f24"
                  size="xs"
                />
              </Button>
            </NavigationContainer>
            <VideoContainer>
              <Video
                key={videoSrc}
                controls
                autoPlay={autoPlay}
                onPlay={this.onVideoPlay}
                onDurationChange={this.onVideoDurationChange}
                onTimeUpdate={this.onVideoTimeUpdate}
                onEnded={this.onVideoEnded}
              >
                <source src={videoSrc} />
                Sorry, your browser doesn't support embedded videos.
              </Video>
              {loading && (
                <VideoOverlay>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    color="#fff"
                    pulse
                    size="2x"
                  />
                  <p>The next clip will start soon</p>
                </VideoOverlay>
              )}
            </VideoContainer>
            <PlaylistContainer>
              <PlaylistHeader>
                <PlaylistHeaderBar>
                  <PlaylistTitle>CLIPS</PlaylistTitle>
                  <Button
                    onClick={() =>
                      openModal('FILTER_CLIPS', {
                        tags,
                        activeTags: filters,
                        onApplyFilters: this.onApplyFilters
                      })
                    }
                  >
                    <FontAwesomeIcon
                      icon={faFilter}
                      color={isFiltering ? '#1d1f24' : '#ff565c'}
                      size="2x"
                    />
                  </Button>
                  {canEdit && (
                    <Button
                      onClick={() =>
                        openModal('NEW_CLIP', {
                          onSaveClip: this.onAddClip,
                          maxDuration: videoDuration
                        })
                      }
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        color="#1d1f24"
                        size="2x"
                      />
                    </Button>
                  )}
                </PlaylistHeaderBar>
                <PlaylistAutoplay>
                  <label>
                    <span>Autoplay</span>
                    <Switch
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onChange={this.onAutoPlayChange}
                      checked={autoPlay}
                      offColor="#bbbbbd"
                      onColor="#ffaaad"
                      onHandleColor="#ff565c"
                      handleDiameter={18}
                      height={14}
                      width={38}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    />
                  </label>
                </PlaylistAutoplay>
              </PlaylistHeader>
              <Playlist
                canEdit={canEdit}
                originalVideo={ORIGINAL_VIDEO}
                videoDuration={videoDuration}
                clips={filteredClips}
                activeClip={activeClip}
                onAddClip={this.onAddClip}
                onRemoveClip={this.onRemoveClip}
                onEditClip={(index, clip) =>
                  openModal('NEW_CLIP', {
                    onSaveClip: this.onEditClip,
                    maxDuration: videoDuration,
                    clipIndex: index,
                    clip
                  })
                }
                onClipChange={this.onClipChange}
              />
            </PlaylistContainer>
          </Container>
        )}
      </Modal>
    )
  }
}

export default VideoPlayer
