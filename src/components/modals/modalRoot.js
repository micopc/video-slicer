import React from 'react'

import NewClipModal from './newClipModal'
import FilterClipsModal from './filterClipsModal'

const MODAL_COMPONENTS = {
  NEW_CLIP: NewClipModal,
  FILTER_CLIPS: FilterClipsModal
}

class ModalRoot extends React.Component {
  state = {
    isModalOpen: false,
    modalType: null,
    modalProps: null
  }

  openModal = (modalType, modalProps) => {
    this.setState({ isModalOpen: true, modalType, modalProps })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false, modalType: null, modalProps: null })
  }

  render() {
    const { modalType, modalProps, isModalOpen } = this.state

    if (!modalType) {
      return this.props.children({
        openModal: this.openModal,
        closeModal: this.closeModal
      })
    }

    const SpecificModal = MODAL_COMPONENTS[modalType]
    return (
      <React.Fragment>
        {this.props.children({
          openModal: this.openModal,
          closeModal: this.closeModal
        })}
        <SpecificModal
          {...modalProps}
          isOpen={isModalOpen}
          close={this.closeModal}
        />
      </React.Fragment>
    )
  }
}

export default ModalRoot
