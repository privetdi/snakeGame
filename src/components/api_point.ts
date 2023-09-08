import { randomNumber } from "./api";
import { ICoordinatPoint } from "./interface";

//нарисовать точку на поле
export function setPoint(polygon: number[][], snake: string[]): ICoordinatPoint {
    const coordinats: ICoordinatPoint = {
        rowsCoordinat: randomNumber(0, polygon.length - 1),
        columnsCoordinat: randomNumber(0, polygon[0].length - 1)
    }
    if (hasMatchingCoordinates(snake, coordinats)) {
        return coordinats
    } else {
        return setPoint(polygon, snake)
    }


}

//проверяем точка находится вне тела змеи
export function hasMatchingCoordinates(arr: string[], coordinats: ICoordinatPoint): boolean {
    for (const item of arr) {
        const [firstPart, secondPart] = item.split('-');
        const rows = parseInt(firstPart);
        const columns = parseInt(secondPart);

        if (rows === coordinats.rowsCoordinat && columns === coordinats.columnsCoordinat) {
            return false;
        }
    }

    return true;
}