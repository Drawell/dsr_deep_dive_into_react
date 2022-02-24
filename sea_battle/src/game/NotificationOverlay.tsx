import React from 'react'

export enum EOverlayMessages {
  empty = '',
  placementOne = 'Корабли расставляет первый игрок!',
  placementTwo = 'Корабли расставляет второй игрок!',
  turnOne = 'Ход первого игрока',
  turnTwo = 'Ход второго игрока',
  resultWinOne = 'Побеждает первый игрок!',
  resultWinTwo = 'Побеждает второй игрок!',
}

interface INotificationOverlayProps {
  message: EOverlayMessages
  onConfirm: () => void
}

interface INotificationOverlayState {}

class NotificationOverlay extends React.Component<
  INotificationOverlayProps,
  INotificationOverlayState
> {
  constructor(props: INotificationOverlayProps) {
    super(props)
  }

  render() {
    return (
      <div className="modal flex-center">
        <div className="card  flex-center flex-column">
          <h1>{this.props.message}</h1>
          <div className="m-50" />
          <input
            type="button"
            value="Продолжить"
            onClick={this.props.onConfirm}
          />
        </div>
      </div>
    )
  }
}

export default NotificationOverlay
