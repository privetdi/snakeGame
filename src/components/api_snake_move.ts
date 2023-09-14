import { gameOver } from "./api_play";
import { ICoordinatPoint } from "./interface";

//обработка возможности выполнения движения и выполнение движения
function setRouteSnake(str: string, arr: string[], limit: number, redPoint: ICoordinatPoint, intervalId: NodeJS.Timer | null) {
    const coordinats = extractDigits(arr)
    //проверка на стены и на наступание на хваст и делаем шаг
    switch (str) {
        case "ArrowUp":
            if (routeAvailable(intervalId, coordinats.y >= 1 ? true : false, arr)) {
                return stepSnake(arr, 'ArrowUp', redPoint, intervalId)
            }
            return { snake: arr };
        case "ArrowRight":
            if (routeAvailable(intervalId, coordinats.x < limit - 1 ? true : false, arr)) {
                return stepSnake(arr, 'ArrowRight', redPoint, intervalId)
            }
            return { snake: arr };
        case "ArrowDown":
            if (routeAvailable(intervalId, coordinats.y < limit - 1 ? true : false, arr)) {
                return stepSnake(arr, 'ArrowDown', redPoint, intervalId)
            }
            return { snake: arr };
        case "ArrowLeft":
            if (routeAvailable(intervalId, coordinats.x >= 1 ? true : false, arr)) {
                return stepSnake(arr, 'ArrowLeft', redPoint, intervalId)
            }
            return { snake: arr };
        default:
            return { snake: arr };
    }
}

export interface ICoordinat {
    y: number,
    x: number
}
//выполнить шаг змеи
function stepSnake(arr: string[], route: string, redPoint: ICoordinatPoint, intervalId: NodeJS.Timer | null): { snake: string[] } {
    const snake = [...arr];
    const lastElementParts = snake[snake.length - 1].split('-');
    if (route === 'ArrowRight') lastElementParts[1] = (parseInt(lastElementParts[1]) + 1).toString();
    if (route === 'ArrowLeft') lastElementParts[1] = (parseInt(lastElementParts[1]) - 1).toString();
    if (route === 'ArrowUp') lastElementParts[0] = (parseInt(lastElementParts[0]) - 1).toString();
    if (route === 'ArrowDown') lastElementParts[0] = (parseInt(lastElementParts[0]) + 1).toString();
    const result = lastElementParts.join('-');
    //проверка наступания на хвост
    if (arr.indexOf(result) === -1) {
        snake.push(result);
        //проверка наступания на красную точку
        if (redPoint.rowsCoordinat !== +lastElementParts[0] || redPoint.columnsCoordinat !== +lastElementParts[1]) snake.shift()
        return { snake };
    } else {
        if (snake[snake.length - 2] !== result) {
            if (intervalId) clearInterval(intervalId)
            gameOver(snake.length - 3)
        }

    }
    return { snake };
}

//массив в координаты головы змеи
function extractDigits(arr: string[]): ICoordinat {
    const lastItem = arr[arr.length - 1];
    const [y, x] = lastItem?.split('-').map(Number) || [];
    return { y, x };
}

//доступность маршрута и врезание в стену
function routeAvailable(intervalId: NodeJS.Timer | null, endMap: boolean, arr: string[],): boolean {
    let headCoordinat = null;
    let result: boolean = false;
    if (arr !== undefined) {
        headCoordinat = extractDigits(arr)
        result = endMap
    }
    if (!result) {
        if (intervalId) clearInterval(intervalId)
        gameOver(arr.length - 3)
    }
    return result
}

//движение змеи добавление нового элемента в массив и удаление первого 
export const snakeMove = (route: string, arr: string[], limit: number, redPoint: ICoordinatPoint, intervalId: NodeJS.Timer | null): { snake: string[] } => {
    return setRouteSnake(route, arr, limit, redPoint, intervalId)

};