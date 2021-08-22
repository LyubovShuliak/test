const inputFiled = document.querySelector('.text-input-filed')
const outputList = document.querySelector('.output-list')
const addCookieBtn = document.querySelector('.add-btn')
const clearCookieBtn = document.querySelector('.clear-btn')
const expireDays = 30 * 24 * 60 * 60

addCookieBtn.addEventListener('click', addCookie)
clearCookieBtn.addEventListener('click', clearCookie)

function addCookie() {
  const oldCookies = getCookie('note_archive')
  console.log(outputList)
  if (outputList.children[0].innerHTML === '[Empty]') {
    outputList.removeChild(outputList.children[0])
  }

  createOutputItem(inputFiled.value)
  if (oldCookies) {
    document.cookie = `note_archive=${oldCookies} ${inputFiled.value}; max-age=${expireDays}`
  } else {
    document.cookie = `note_archive=${inputFiled.value}; max-age=${expireDays}`
  }
  inputFiled.value = ''
}
function clearCookie() {
  const shouldDelete = confirm('Are you sure?')
  if (shouldDelete) {
    outputList.innerHTML = null
    document.cookie = 'note_archive=; max-age=-1'
    createEmptyMessage()
  }
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

function createOutputItem(value) {
  const outputItem = document.createElement('p')
  outputItem.classList.add('output-item')
  outputItem.innerHTML = '-->' + value
  outputList.appendChild(outputItem)
}

window.onload = () => {
  const currentCookie = getCookie('note_archive')
  if (currentCookie) {
    const outputArray = currentCookie.split(' ')

    for (let i = 0; i < outputArray.length; i++) {
      createOutputItem(outputArray[i])
    }
  } else {
    createEmptyMessage()
  }
}

function createEmptyMessage() {
  const noCookies = document.createElement('p')
  noCookies.innerHTML = '[Empty]'
  outputList.appendChild(noCookies)
}
