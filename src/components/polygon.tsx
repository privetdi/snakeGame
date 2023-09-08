import React from 'react'
import { IProps, IState } from './interface'
import { fillArray, fillArray2 } from './api'
import { snakeMove } from './api_snake_move'
import { hasMatchingCoordinates, setPoint } from './api_point'

class Polygon extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      snake: ['4-5', '5-5', '5-6'],
      redPoint: null,
    }
  }

  //при нажатии на кнопку обновляет координаты змеи
  //при наступании на redPoint выполняется обновление redPoint
  handleKeyDown = (event: React.KeyboardEvent) => {
    const { snake, redPoint } = this.state
    this.setState((prevState): IState => {
      const updatedSnake = snakeMove(event, prevState.snake, 10).snake
      let updatedRedPoint = prevState.redPoint
      if (redPoint && !hasMatchingCoordinates(updatedSnake, redPoint)) {
        updatedRedPoint = setPoint(this.b, updatedSnake)
      }
      return {
        snake: updatedSnake,
        redPoint: updatedRedPoint,
      }
    })
  }

  b = fillArray2(fillArray([], 10), 10)

  componentDidMount(): void {
    const { snake, redPoint } = this.state
    if (redPoint === null) {
      console.log('если нулл')

      this.setState({ redPoint: setPoint(this.b, snake) })
    }
  }

  render(): JSX.Element {
    const { snake, redPoint } = this.state
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column' }}
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
      >
        Polygon{' '}
        {this.b != null
          ? this.b.map((item1, index1) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {' '}
                  {item1.map((item2, index2) => {
                    return (
                      <div
                        id={index1 + '-' + index2}
                        style={
                          snake.some((item) => item === index1 + '-' + index2)
                            ? { backgroundColor: 'green' }
                            : index1 === redPoint?.rowsCoordinat &&
                              index2 === redPoint?.columnsCoordinat
                            ? { backgroundColor: 'red' }
                            : { backgroundColor: 'grey' }
                        }
                      >
                        {item2 - 1}
                      </div>
                    )
                  })}{' '}
                </div>
              )
            })
          : null}
      </div>
    )
  }
}

export default Polygon
