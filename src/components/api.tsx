//создает массив (вертикаль)

export function fillArray2(
  arr: number[],
  limit: number,
  arr2?: number[][]
): number[][] {
  if (typeof arr2 !== 'undefined') {
    if (arr2.length >= limit) {
      return arr2
    } else {
      arr2.push(arr)
      return fillArray2(arr, limit, arr2)
    }
  } else {
    if (arr.length === 0) {
      return []
    } else {
      let myArray: number[][] = []
      myArray.push(arr)

      return fillArray2(arr, limit, myArray)
    }
  }
}

//создает массив (горизонталь)
export function fillArray(arr: number[], limit: number): number[] {
  if (arr.length === 0) {
    arr.push(1)
    fillArray(arr, limit)
  } else {
    if (arr.length >= limit) {
      return arr
    } else {
      arr.push(arr.length + 1)
      fillArray(arr, limit)
    }
  }
  return arr
}

export function setArray(n1: number, n2: number): number[][] {
  let array = [[n1], [n2]]
  return array
}

export function randomNumber(min: number, max: number): number {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}
