const tabItems = document.querySelectorAll('.tab-item')
const tabContentItems = document.querySelectorAll('.tab-content-item')

function selectBorderContent(e) {
  // Remove and add border
  removeBorders()
  removeHighlights()
  this.classList.add('tab-border')
  this.classList.add('highlight-tab')

  // Change content dynamically
  removeShow()
  const contentItem = document.querySelector(`#${this.id}-content`)
  contentItem.classList.add('show')
  console.log(contentItem)
}

const removeBorders = () => {
  tabItems.forEach(tabItem => (
    tabItem.classList.remove('tab-border')
  ))
}

const removeHighlights = () => {
  tabItems.forEach(tabItem => (
    tabItem.classList.remove('highlight-tab')
  ))
}

const removeShow = () => {
  console.log('show here')
  tabContentItems.forEach(tabContentItem => (
    tabContentItem.classList.remove('show')
  ))
}

tabItems.forEach(tabItem => tabItem.addEventListener('click', selectBorderContent))
