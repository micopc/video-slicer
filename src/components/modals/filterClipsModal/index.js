import React from 'react'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { modalStyles, ModalContainer, ModalHeader, CloseButton } from '../style'
import { TagsList, TagItem, Actions } from './style'
import { Form, Button } from '../../formElements'

class FilterClipsModal extends React.Component {
  constructor(props) {
    super(props)

    const tagFilters = props.tags.map(tag => {
      let active = false
      if (props.activeTags.includes(tag)) {
        active = true
      }

      return {
        name: tag,
        active
      }
    })

    this.state = {
      tagFilters
    }
  }

  handleTagFilterChange = (index, active) => {
    const { tagFilters } = this.state

    tagFilters[index].active = active

    this.setState({ tagFilters })
  }

  onFiltersFormSubmit = e => {
    e.preventDefault()

    const filters = this.state.tagFilters
      .filter(tag => tag.active)
      .map(tag => tag.name)

    this.props.onApplyFilters(filters)
    this.props.close()
  }

  onClearFiltersClick = e => {
    this.props.onApplyFilters([])
    this.props.close()
  }

  render() {
    const { isOpen, close } = this.props
    const { tagFilters } = this.state

    return (
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={close}
        style={modalStyles}
        contentLabel="Filter clips"
        shouldCloseOnOverlayClick
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onClick={close}>
              <FontAwesomeIcon icon={faTimes} color="#1d1f24" />
            </CloseButton>
          </ModalHeader>
          <Form
            instructions="FILTER YOUR CLIPS BY TAGS"
            onSubmit={this.onFiltersFormSubmit}
          >
            <TagsList>
              {tagFilters.map((tag, index) => (
                <TagItem key={tag.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={tag.active}
                      onChange={e =>
                        this.handleTagFilterChange(index, e.target.checked)
                      }
                    />
                    {tag.name}
                  </label>
                </TagItem>
              ))}
            </TagsList>
            <Actions>
              <Button type="button" onClick={this.onClearFiltersClick}>
                CLEAR FILTERS
              </Button>
              <Button type="submit" primary>
                APPLY FILTERS
              </Button>
            </Actions>
          </Form>
        </ModalContainer>
      </Modal>
    )
  }
}

export default FilterClipsModal
