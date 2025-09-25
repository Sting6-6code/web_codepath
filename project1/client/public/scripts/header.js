document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header')
    if (!header) return
  
    const container = document.createElement('div')
    container.className = 'header-container'
  
    const left = document.createElement('div')
    left.className = 'header-left'
  
    const logo = document.createElement('img')
    logo.src = '/logo.png'
    logo.alt = 'Logo'
    logo.style.height = '32px'
  
    const title = document.createElement('h1')
    title.textContent = 'Boss Battle Guide'
  
    left.appendChild(logo)
    left.appendChild(title)
  
    const right = document.createElement('div')
    right.className = 'header-right'
  
    const homeBtn = document.createElement('button')
    homeBtn.textContent = 'Home'
    homeBtn.addEventListener('click', () => { window.location = '/' })
  
    right.appendChild(homeBtn)
  
    container.appendChild(left)
    container.appendChild(right)
  
    // 清空 header 原有内容，插入新结构
    header.innerHTML = ''
    header.appendChild(container)
  })