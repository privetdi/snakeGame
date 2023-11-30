import { windowModal } from './api_modalWindow'

//чистка timerID, модальное окно
export function gameOver(result: number) {
  setTimeout(() => window.location.reload(), 3000)
  windowModal(`Game over<br>result: ${result}`)
}
