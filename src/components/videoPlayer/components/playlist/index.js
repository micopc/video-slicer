import React from 'react'
import {
  Container,
  Header,
  CollapsableSection,
  CollapsableHeader,
  ClipList,
  ClipItem,
  ClipItemWrapper,
  ClipForm,
  Instructions,
  ClipFormButton,
  NowPlaying,
  ClipInfo,
  ClipName,
  ClipTime,
  ClipActions,
  Button,
  OriginalIndicator,
  NoClipsMessage
} from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faFilter,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { Input } from '../../../formElements'

class Playlist extends React.Component {
  state = {
    addClipSectionCollapsed: true,
    clipName: '',
    clipStartTime: '',
    clipEndTime: ''
  }

  onAddClipClick = e => {
    e.preventDefault()
    this.setState({ addClipSectionCollapsed: false })
  }

  onCloseSectionClick = e => {
    e.preventDefault()
    this.setState({ addClipSectionCollapsed: true })
  }

  onClipNameChange = clipName => {
    this.setState({ clipName })
  }

  onClipFormSubmit = e => {
    e.preventDefault()

    const { clipName, clipStartTime, clipEndTime } = this.state
    const clip = { clipName, clipStartTime, clipEndTime }

    this.setState({ addClipSectionCollapsed: true }, () =>
      this.props.onAddClip(clip)
    )
  }

  render() {
    const { clips, activeClip } = this.props
    const { addClipSectionCollapsed } = this.state

    return (
      <Container>
        <Header>
          <div>Clips</div>
          <div>
            <Button>
              <FontAwesomeIcon icon={faFilter} color="#1d1f24" />
            </Button>
            <Button onClick={this.onAddClipClick}>
              <FontAwesomeIcon icon={faPlus} color="#1d1f24" />
            </Button>
          </div>
        </Header>
        {!addClipSectionCollapsed && (
          <CollapsableSection>
            <CollapsableHeader>
              <Button onClick={this.onCloseSectionClick}>
                <FontAwesomeIcon icon={faTimes} color="#1d1f24" />
              </Button>
            </CollapsableHeader>
            <ClipForm onSubmit={this.onClipFormSubmit}>
              <Instructions>ADD A NEW CLIP</Instructions>
              <Input label="Clip name" />
              <Input label="Start time" />
              <Input label="End time" />
              <ClipFormButton>SAVE</ClipFormButton>
            </ClipForm>
          </CollapsableSection>
        )}
        <ClipList>
          {clips.map(clip => (
            <ClipItem key={clip} active={activeClip === clip}>
              {activeClip === clip && <NowPlaying>NOW PLAYING</NowPlaying>}
              <ClipItemWrapper>
                <FontAwesomeIcon
                  icon={faPlay}
                  color={activeClip === clip ? '#fff' : '#1d1f24'}
                />
                <ClipInfo>
                  <ClipName active={activeClip === clip}>Hello World</ClipName>
                  <ClipTime active={activeClip === clip}>0:10 - 0:26</ClipTime>
                </ClipInfo>
                {clip === 1 ? (
                  <ClipActions>
                    <OriginalIndicator active={activeClip === clip}>
                      ORIGINAL
                    </OriginalIndicator>
                  </ClipActions>
                ) : (
                  <ClipActions>
                    <Button>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        color={activeClip === clip ? '#fff' : '#1d1f24'}
                      />
                    </Button>
                    <Button>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        color={activeClip === clip ? '#fff' : '#1d1f24'}
                      />
                    </Button>
                  </ClipActions>
                )}
              </ClipItemWrapper>
            </ClipItem>
          ))}
          {clips.length === 1 && (
            <NoClipsMessage>
              YOU CAN ADD CLIPS BY CLICKING THE PLUS ICON (+) ON THE TOP OF THIS
              SECTION
            </NoClipsMessage>
          )}
        </ClipList>
      </Container>
    )
  }
}

export default Playlist
