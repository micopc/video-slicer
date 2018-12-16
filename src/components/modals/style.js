import styled from 'styled-components'

export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '1.2rem',
    zIndex: 10
  },
  content: {
    position: 'relative',
    backgroundColor: '#fff',
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    padding: 0,
    border: 0,
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto'
  }
}

export const ModalContainer = styled.div`
  padding: 2rem;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px 5px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
`

export const CloseButton = styled.button`
  background-color: transparent;
  border: 0;
  -webkit-appearance: none;
  cursor: pointer;
  padding: 5px;
  font-size: 18px;
`
