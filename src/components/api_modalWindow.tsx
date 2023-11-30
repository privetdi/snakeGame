import './modalWindow.scss'

export function windowModal(message: string) {
  const modalRoot = document.getElementById('modal-root') // Получаем элемент для портала
  if (modalRoot) {
    const modalContainer = document.createElement('div')
    modalContainer.className = 'modal-container'
    const modalElement = document.createElement('div')
    modalElement.className = 'modal'
    modalElement.innerHTML = `
        <h2>${message}</h2>
      `
    modalContainer.appendChild(modalElement)
    modalRoot.appendChild(modalContainer)
  }
}
