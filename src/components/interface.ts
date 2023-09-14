export interface IProps {
    item: number
}

export interface ICoordinatPoint {
    rowsCoordinat: number,
    columnsCoordinat: number
}

export interface IState {
    redPoint: ICoordinatPoint | null
    snake: string[],
    route: string,
    intervalId: NodeJS.Timer | null
}