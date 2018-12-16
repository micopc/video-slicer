import React from 'react'
import { Container, Button } from './style'

const EditSwitch = ({ canEdit, onChange }) => (
  <Container>
    <Button type="button" active={canEdit} onClick={() => onChange(true)}>
      Editor
    </Button>
    <Button type="button" active={!canEdit} onClick={() => onChange(false)}>
      Player
    </Button>
  </Container>
)

export default EditSwitch
