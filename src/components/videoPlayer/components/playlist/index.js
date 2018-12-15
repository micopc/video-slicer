import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faFilter
} from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Header,
  ClipList,
  ClipItem,
  ClipItemWrapper,
  ClipInfo,
  ClipName,
  ClipTime,
  ClipActions,
  Button,
  NowPlaying,
  NoClipsMessage
} from './style'
import NewClipModal from '../../../newClipModal'
import { formatTimeMarks } from '../../../../utils'

const Playlist = ({
  originalVideo,
  videoDuration,
  clips,
  activeClip,
  onAddClip,
  onRemoveClip,
  onClipChange
}) => {
  const isOriginalVideoActive = activeClip.id === originalVideo.id

  return (
    <Container>
      <Header>
        <div>Clips</div>
        <div>
          <Button>
            <FontAwesomeIcon icon={faFilter} color="#1d1f24" />
          </Button>
          <NewClipModal onAddClip={onAddClip} maxDuration={videoDuration}>
            {({ openModal }) => (
              <Button onClick={() => openModal()}>
                <FontAwesomeIcon icon={faPlus} color="#1d1f24" />
              </Button>
            )}
          </NewClipModal>
        </div>
      </Header>
      <ClipList>
        <ClipItem active={isOriginalVideoActive}>
          {isOriginalVideoActive && <NowPlaying>NOW PLAYING</NowPlaying>}
          <ClipItemWrapper>
            <ClipInfo>
              <ClipName active={isOriginalVideoActive}>
                {originalVideo.name}
              </ClipName>
              <ClipTime active={isOriginalVideoActive}>
                {formatTimeMarks(originalVideo.start)} -{' '}
                {formatTimeMarks(videoDuration)}
              </ClipTime>
            </ClipInfo>
            <ClipActions>
              <Button type="button" onClick={() => onClipChange(originalVideo)}>
                <FontAwesomeIcon
                  icon={faPlay}
                  color={isOriginalVideoActive ? '#fff' : '#1d1f24'}
                />
              </Button>
            </ClipActions>
          </ClipItemWrapper>
        </ClipItem>
        {clips.map((clip, index) => {
          const active = activeClip.id === clip.id

          return (
            <ClipItem key={clip.id} active={active}>
              {active && <NowPlaying>NOW PLAYING</NowPlaying>}
              <ClipItemWrapper>
                <ClipInfo>
                  <ClipName active={active}>{clip.name}</ClipName>
                  <ClipTime active={active}>
                    {formatTimeMarks(clip.start)} - {formatTimeMarks(clip.end)}
                  </ClipTime>
                </ClipInfo>
                <ClipActions>
                  <Button type="button" onClick={() => onClipChange(clip)}>
                    <FontAwesomeIcon
                      icon={faPlay}
                      color={active ? '#fff' : '#1d1f24'}
                    />
                  </Button>
                  <Button>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      color={active ? '#fff' : '#1d1f24'}
                    />
                  </Button>
                  <Button type="button" onClick={() => onRemoveClip(index)}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      color={active ? '#fff' : '#1d1f24'}
                    />
                  </Button>
                </ClipActions>
              </ClipItemWrapper>
            </ClipItem>
          )
        })}
        {clips.length === 0 && (
          <NoClipsMessage>
            YOU CAN ADD CLIPS BY CLICKING THE PLUS ICON (+) ON THE TOP OF THIS
            SECTION
          </NoClipsMessage>
        )}
      </ClipList>
    </Container>
  )
}

export default Playlist
