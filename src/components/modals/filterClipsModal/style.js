import styled from 'styled-components'

export const TagsList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const TagItem = styled.li`
  width: 50%;

  & span {
    margin-left: 5px;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
`
