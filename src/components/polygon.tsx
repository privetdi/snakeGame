import React, { RefObject } from 'react'
import { IState } from './interface'
import { gameFieldRows, gameFieldColumns } from './api'
import { snakeMove } from './api_snake_move'
import { hasMatchingCoordinates, setPoint } from './api_point'
import { debounce } from './api'
import './polygon.scss'

class Polygon extends React.Component<{}, IState> {
  private myElementRef: RefObject<HTMLInputElement>
  constructor() {
    super({})
    this.state = {
      snake: ['4-5', '5-5', '5-6'],
      redPoint: null,
      route: 'ArrowLeft',
      intervalId: null,
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.myElementRef = React.createRef()
  }

  //при нажатии на кнопку обновляет координаты змеи
  //при наступании на redPoint выполняется обновление redPoint
  moveSnake = (route: string) => {
    const { redPoint } = this.state
    this.setState((prevState): IState => {
      //вычислить будущие координаты и если будущие координаты равны redPoint
      //то не применять удаление первого эллемента массива
      const updatedSnake = snakeMove(
        route,
        prevState.snake,
        10,
        redPoint ? redPoint : { rowsCoordinat: 0, columnsCoordinat: 0 },
        this.state.intervalId
      ).snake
      let updatedRedPoint = prevState.redPoint
      let upddateStart = route

      //проверка красная точка существует и точка вне тела змеи
      if (redPoint && !hasMatchingCoordinates(updatedSnake, redPoint)) {
        updatedRedPoint = setPoint(this.polygon, updatedSnake)
      }
      return {
        snake: updatedSnake,
        redPoint: updatedRedPoint,
        route: upddateStart,
        intervalId: this.state.intervalId,
      }
    })
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    this.setState(
      (prevState) => {
        //исключаем шаг назад
        const prevRoute = prevState.route
        const key: string = typeof event === 'string' ? event : event.key
        // Определите новый маршрут на основе предыдущего и текущего нажатия клавиши
        let newRoute
        switch (key) {
          case 'ArrowUp':
            newRoute = prevRoute === 'ArrowDown' ? 'ArrowDown' : key
            break
          case 'ArrowDown':
            newRoute = prevRoute === 'ArrowUp' ? 'ArrowUp' : key
            break
          case 'ArrowRight':
            newRoute = prevRoute === 'ArrowLeft' ? 'ArrowLeft' : key
            break
          case 'ArrowLeft':
            newRoute = prevRoute === 'ArrowRight' ? 'ArrowRight' : key
            break
          default:
            newRoute = key
        }
        return { route: newRoute }
      },
      () => {
        this.moveSnake(this.state.route)
        this.startTimer(this.state.route)
        if (this.state.intervalId !== null) {
          clearInterval(this.state.intervalId)
        }
      }
    )
  }

  debounceHandleKeyDown = debounce(this.handleKeyDown, 350)

  //рисуем игровую сетку
  polygon = gameFieldColumns(gameFieldRows([], 10), 10)

  cb = (route: string) => {
    this.moveSnake(route)
  }

  startTimer = (route: string) => {
    const { snake, redPoint } = this.state
    if (redPoint === null) {
      this.setState({ redPoint: setPoint(this.polygon, snake) })
    }
    let intervalId = setInterval(() => {
      this.setState(
        () => {
          return { route: route }
        },
        () => {
          this.cb(route)
        }
      )
    }, 700)
    this.setState(() => {
      return { intervalId: intervalId }
    })
  }

  //фокус на полигон
  componentDidMount(): void {
    if (this.myElementRef.current) this.myElementRef.current.focus()
  }

  render(): JSX.Element {
    const { snake, redPoint } = this.state
    return (
      <div
        ref={this.myElementRef}
        style={{ display: 'flex', flexDirection: 'column' }}
        onKeyDown={this.debounceHandleKeyDown}
        tabIndex={0}
      >
        red points {this.state.snake.length - 3}
        {this.polygon != null
          ? this.polygon.map((item1, index1) => {
              return (
                <div
                  key={index1}
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  {' '}
                  {item1.map((item2, index2) => {
                    return (
                      <div
                        key={index2}
                        id={index1 + '-' + index2}
                        className={
                          snake.some((item) => item === index1 + '-' + index2)
                            ? `tile ${'snake'} `
                            : index1 === redPoint?.rowsCoordinat &&
                              index2 === redPoint?.columnsCoordinat
                            ? `tile ${'redPoint'}`
                            : `tile ${'grey'}`
                        }
                      >
                        {''}
                      </div>
                    )
                  })}{' '}
                </div>
              )
            })
          : null}
        <div>для старта нажмите стрелки на клавиатуре</div>
        <div id="modal-root"></div>
      </div>
    )
  }
}

export default Polygon
