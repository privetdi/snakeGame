//создает массив (горизональ/столбцы)
export function gameFieldColumns(
  arr: number[],
  limit: number,
  arr2?: number[][]
): number[][] {
  if (typeof arr2 !== 'undefined') {
    if (arr2.length >= limit) {
      return arr2
    } else {
      arr2.push(arr)
      return gameFieldColumns(arr, limit, arr2)
    }
  } else {
    if (arr.length === 0) {
      return []
    } else {
      let myArray: number[][] = []
      myArray.push(arr)

      return gameFieldColumns(arr, limit, myArray)
    }
  }
}

//создает массив (вертикаль)
export function gameFieldRows(arr: number[], limit: number): number[] {
  if (arr.length === 0) {
    arr.push(1)
    gameFieldRows(arr, limit)
  } else {
    if (arr.length >= limit) {
      return arr
    } else {
      arr.push(arr.length + 1)
      gameFieldRows(arr, limit)
    }
  }
  return arr
}

export function randomNumber(min: number, max: number): number {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export function debounce(
  func: (...args: any[]) => void,
  delay: number
): (...args: any[]) => Promise<void> {
  let timeoutId: NodeJS.Timeout | null = null

  return async function (...args: any[]): Promise<void> {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    return new Promise<void>((resolve) => {
      timeoutId = setTimeout(async () => {
        await func(...args)
        resolve()
      }, delay)
    })
  }
}
