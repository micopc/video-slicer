import React from 'react'
import Modal from 'react-modal'
import {
  modalStyles,
  Container,
  Header,
  CloseButton,
  ClipForm,
  Instructions,
  ClipFormButton,
  Error
} from './style'
import { Input } from '../formElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { generateRandomID } from '../../utils'

class NewClipModal extends React.Component {
  state = {
    isModalOpen: false,
    clipName: '',
    clipStartTime: '',
    clipStartTimeError: false,
    clipEndTime: '',
    clipEndTimeError: false,
    addClipError: false
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
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

    const { clipName, clipStartTime, clipEndTime } = this.state

    if (Number(clipStartTime) >= Number(clipEndTime)) {
      this.setState({ addClipError: true })
      return
    }

    const clip = {
      id: generateRandomID(),
      name: clipName,
      start: clipStartTime,
      end: clipEndTime
    }

    this.props.onAddClip(clip)

    this.setState({
      clipName: '',
      clipStartTime: '',
      clipEndTime: '',
      addClipError: false,
      isModalOpen: false
    })
  }

  render() {
    const {
      isModalOpen,
      clipName,
      clipStartTime,
      clipStartTimeError,
      clipEndTime,
      clipEndTimeError,
      addClipError
    } = this.state
    const { maxDuration, children } = this.props

    return (
      <React.Fragment>
        {children({
          openModal: this.openModal,
          closeModal: this.closeModal
        })}
        <Modal
          ariaHideApp={false}
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Add new clip"
          shouldCloseOnOverlayClick
        >
          <Container>
            <Header>
              <CloseButton onClick={this.closeModal}>
                <FontAwesomeIcon icon={faTimes} color="#1d1f24" />
              </CloseButton>
            </Header>
            <ClipForm onSubmit={this.onClipFormSubmit}>
              <Instructions>ADD A NEW CLIP</Instructions>
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
              {addClipError && (
                <Error>Please ensure all fields are valid</Error>
              )}
              <ClipFormButton
                disabled={
                  clipName === '' ||
                  clipStartTime === '' ||
                  clipStartTimeError ||
                  clipEndTime === '' ||
                  clipEndTimeError
                }
              >
                SAVE
              </ClipFormButton>
            </ClipForm>
          </Container>
        </Modal>
      </React.Fragment>
    )
  }
}

export default NewClipModal
