import React from 'react'
import { Container, Logo } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

const Header = () => (
  <Container>
    <FontAwesomeIcon icon={faPlayCircle} color="#FF565C" size="2x" />
    <Logo>VIDEO SLICER</Logo>
  </Container>
)

export default Header
