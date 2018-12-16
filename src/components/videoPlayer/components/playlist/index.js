import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  ClipList,
  ClipItem,
  ClipLink,
  ClipItemWrapper,
  ClipInfo,
  ClipName,
  ClipTime,
  ClipTags,
  ClipActions,
  Button,
  NowPlaying,
  NoClipsMessage
} from './style'
import { formatTimeMarks } from '../../../../utils'

const Playlist = ({
  canEdit,
  originalVideo,
  videoDuration,
  clips,
  activeClip,
  onRemoveClip,
  onEditClip,
  onClipChange
}) => {
  const isOriginalVideoActive = activeClip.id === originalVideo.id

  return (
    <Container>
      <ClipList>
        <ClipItem active={isOriginalVideoActive}>
          {isOriginalVideoActive && <NowPlaying>NOW PLAYING</NowPlaying>}
          <ClipItemWrapper>
            <ClipLink
              onClick={e => {
                e.preventDefault()
                onClipChange(originalVideo)
              }}
              href="#"
            >
              <ClipInfo>
                <ClipName active={isOriginalVideoActive}>
                  {originalVideo.name}
                </ClipName>
                <ClipTime active={isOriginalVideoActive}>
                  {formatTimeMarks(originalVideo.start)} -{' '}
                  {formatTimeMarks(videoDuration)}
                </ClipTime>
              </ClipInfo>
            </ClipLink>
          </ClipItemWrapper>
        </ClipItem>
        {clips.map((clip, index) => {
          const active = activeClip.id === clip.id

          return (
            <ClipItem key={clip.id} active={active}>
              {active && <NowPlaying>NOW PLAYING</NowPlaying>}
              <ClipItemWrapper>
                <ClipLink
                  onClick={e => {
                    e.preventDefault()
                    onClipChange(clip)
                  }}
                  href="#"
                >
                  <ClipInfo>
                    <ClipName active={active}>{clip.name}</ClipName>
                    <ClipTime active={active}>
                      {formatTimeMarks(clip.start)} -{' '}
                      {formatTimeMarks(clip.end)}
                    </ClipTime>
                    <ClipTags active={active}>
                      {clip.tags && clip.tags.join(', ')}
                    </ClipTags>
                  </ClipInfo>
                </ClipLink>
                {canEdit && (
                  <ClipActions>
                    <Button
                      type="button"
                      onClick={() => onEditClip(index, clip)}
                    >
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
                )}
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
