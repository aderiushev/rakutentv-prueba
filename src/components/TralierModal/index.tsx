import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import ReactPlayer from 'react-player/file'

type Props = {
  url: string
  open: boolean
  onClose: () => void
  onOpen: () => void
}

export const TrailerModal = (props: Props) => {
  return (
    <Modal
      data-testid="trailer-modal"
      onClose={props.onClose}
      onOpen={props.onOpen}
      open={props.open}
    >
      <Modal.Header>Trailer</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <ReactPlayer
            width="100%"
            controls
            url={props.url}
            data-testid="trailer-modal-player"
          />
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button
          color="black"
          onClick={props.onClose}
          data-testid="trailer-modal-close-button"
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
