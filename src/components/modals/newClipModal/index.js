import React from 'react'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Error } from './style'
import { modalStyles, ModalContainer, ModalHeader, CloseButton } from '../style'
import { Form, Input, CreatableSelect, Button } from '../../formElements'
import { generateRandomID } from '../../../utils'

class NewClipModal extends React.Component {
  state = {
    clipId: null,
    clipName: this.props.clip ? this.props.clip.name : '',
    clipStartTime: this.props.clip ? this.props.clip.start : '',
    clipStartTimeError: false,
    clipEndTime: this.props.clip ? this.props.clip.end : '',
    clipEndTimeError: false,
    clipTags:
      this.props.clip && this.props.clip.tags ? this.props.clip.tags : [],
    addClipError: false
  }

  handleClipNameChange = e => {
    this.setState({ clipName: e.target.value })
  }

  handleClipStartTimeChange = e => {
    const clipStartTime = e.target.value

    const clipStartTimeNumber = Number(clipStartTime)

    if (isNaN(clipStartTimeNumber)) {
      return
    }

    if (
      clipStartTimeNumber < 0 ||
      clipStartTimeNumber >= this.props.maxDuration
    ) {
      this.setState({
        clipStartTime,
        clipStartTimeError: true
      })

      return
    }

    this.setState({ clipStartTime, clipStartTimeError: false })
  }

  handleClipEndTimeChange = e => {
    const clipEndTime = e.target.value

    const clipEndTimeNumber = Number(clipEndTime)

    if (isNaN(clipEndTimeNumber)) {
      return
    }

    if (clipEndTimeNumber < 0 || clipEndTimeNumber > this.props.maxDuration) {
      this.setState({
        clipEndTime,
        clipEndTimeError: true
      })

      return
    }

    this.setState({ clipEndTime, clipEndTimeError: false })
  }

  onClipFormSubmit = e => {
    e.preventDefault()

    const {
      clipId,
      clipName,
      clipStartTime,
      clipEndTime,
      clipTags
    } = this.state

    if (Number(clipStartTime) >= Number(clipEndTime)) {
      this.setState({ addClipError: true })
      return
    }

    const clip = {
      id: clipId || generateRandomID(),
      name: clipName,
      start: clipStartTime,
      end: clipEndTime,
      tags: clipTags
    }

    if (clipId) {
      this.props.onSaveClip(this.props.clipIndex, clip)
    } else {
      this.props.onSaveClip(clip)
    }

    this.props.close()
  }

  onClipTagCreate = newTag => {
    const clipTags = [...this.state.clipTags, newTag]

    this.setState({ clipTags })
  }

  handleClipTagsChange = tags => {
    this.setState({ clipTags: tags.map(tag => tag.value) })
  }

  render() {
    const {
      clipId,
      clipName,
      clipStartTime,
      clipStartTimeError,
      clipEndTime,
      clipEndTimeError,
      clipTags,
      addClipError
    } = this.state
    const { isOpen, maxDuration, close } = this.props

    return (
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={close}
        style={modalStyles}
        contentLabel={clipId ? 'Edit a clip' : 'Add new clip'}
        shouldCloseOnOverlayClick
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onClick={close}>
              <FontAwesomeIcon icon={faTimes} color="#1d1f24" />
            </CloseButton>
          </ModalHeader>
          <Form
            instructions={clipId ? 'EDIT A CLIP' : 'ADD A NEW CLIP'}
            onSubmit={this.onClipFormSubmit}
          >
            <Input
              label="Clip name"
              value={clipName}
              onChange={this.handleClipNameChange}
            />
            <Input
              label="Start time"
              value={clipStartTime}
              onChange={this.handleClipStartTimeChange}
            />
            {clipStartTimeError && (
              <Error>
                The start time should be between 0 and {maxDuration}
              </Error>
            )}
            <Input
              label="End time"
              value={clipEndTime}
              onChange={this.handleClipEndTimeChange}
            />
            {clipEndTimeError && (
              <Error>
                The end time should be greater than the start time and lower
                than {maxDuration}
              </Error>
            )}
            {addClipError && <Error>Please ensure all fields are valid</Error>}
            <CreatableSelect
              label="Tags"
              isMulti
              options={clipTags.map(tag => ({
                label: tag,
                value: tag
              }))}
              value={clipTags.map(tag => ({
                label: tag,
                value: tag
              }))}
              onChange={this.handleClipTagsChange}
              onCreateOption={this.onClipTagCreate}
            />
            <Button
              primary
              type="submit"
              disabled={
                clipName === '' ||
                clipStartTime === '' ||
                clipStartTimeError ||
                clipEndTime === '' ||
                clipEndTimeError
              }
            >
              SAVE
            </Button>
          </Form>
        </ModalContainer>
      </Modal>
    )
  }
}

export default NewClipModal
