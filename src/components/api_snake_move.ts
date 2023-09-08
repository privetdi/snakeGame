//обработка возможности выполнения движения и выполнение движения
function setRouteSnake(str: string, arr: string[], limit: number) {
    const coordinats = extractDigits(arr);


    //проверка на стены и на наступание на хваст и делаем шаг

    switch (str) {
        case "ArrowUp":
            if (routeAvailable((coordinats) => { return coordinats.y >= 1 ? true : false }, arr)) {
                return stepSnake(arr, 'ArrowUp')
            }
            return { snake: arr };
        case "ArrowRight":
            if (routeAvailable((coordinats) => { return coordinats.x < limit - 1 ? true : false }, arr)) {
                return stepSnake(arr, 'ArrowRight')
            }
            return { snake: arr };
        case "ArrowDown":
            if (routeAvailable((coordinats) => { return coordinats.y < limit - 1 ? true : false }, arr)) {
                return stepSnake(arr, 'ArrowDown')
            }
            return { snake: arr };
        case "ArrowLeft":
            if (routeAvailable((coordinats) => { return coordinats.x >= 1 ? true : false }, arr)) {
                return stepSnake(arr, 'ArrowLeft')
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
//шаг змеи
function stepSnake(arr: string[], route: string): { snake: string[] } {
    const snake = [...arr];
    const lastElementParts = snake[snake.length - 1].split('-');
    if (route === 'ArrowRight') lastElementParts[1] = (parseInt(lastElementParts[1]) + 1).toString();
    if (route === 'ArrowLeft') lastElementParts[1] = (parseInt(lastElementParts[1]) - 1).toString();
    if (route === 'ArrowUp') lastElementParts[0] = (parseInt(lastElementParts[0]) - 1).toString();
    if (route === 'ArrowDown') lastElementParts[0] = (parseInt(lastElementParts[0]) + 1).toString();
    const result = lastElementParts.join('-');
    if (arr.indexOf(result) === -1) {
        snake.push(result);
        snake.shift();
        return { snake };
    }
    return { snake };
}

//массив в координаты головы змеи
function extractDigits(arr: string[]): ICoordinat {
    const lastItem = arr[arr.length - 1];
    const [y, x] = lastItem?.split('-').map(Number) || [];

    return { y, x };
}

//доступность маршрута
function routeAvailable(logicCb: (coordinat: ICoordinat) => boolean, arr?: string[]): boolean {
    let headCoordinat = null;
    let result: boolean = false;
    if (arr !== undefined) {
        headCoordinat = extractDigits(arr)
        result = logicCb(headCoordinat)
    }


    return result
}

//движение змеи добавление нового элемента в массив и удаление первого 
export const snakeMove = (event: React.KeyboardEvent, arr: string[], limit: number): { snake: string[] } => {
    return setRouteSnake(event.key, arr, limit)

};