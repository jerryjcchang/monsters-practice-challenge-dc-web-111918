document.addEventListener('DOMContentLoaded', function(){

getMonsters(1)
renderMonsterForm()
monsterForm().addEventListener('submit', handleMonsterForm)
backButton().addEventListener('click', handleBackButton)
forwardButton().addEventListener('click', handleForwardButton)

})

//get elements

function monsterContainer(){
  return document.querySelector('#monster-container')
}

function monsterFormDiv(){
  return document.querySelector('#create-monster')
}

function monsterForm(){
  return document.querySelector('#monster-form')
}

function backButton(){
  return document.querySelector('#back')
}

function forwardButton(){
  return document.querySelector('#forward')
}

forwardButton().dataset.id = 1
//renders

function getMonsters(num){
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
  .then(r => r.json())
  .then(monsters => {
    monsters.forEach(monster => renderMonster(monster)),
    console.log(monsters[49].id)
  })
}

function renderMonster(monster){
  let monsterDiv = document.createElement('div')
  let name = document.createElement('h2')
    name.innerText = monster.name
    monsterDiv.appendChild(name)
  let age = document.createElement('h4')
    age.innerText = monster.age
    monsterDiv.appendChild(name)
  let description = document.createElement('p')
    description.innerText = monster.description
    monsterDiv.appendChild(description)
  monsterContainer().appendChild(monsterDiv)
}

function renderMonsterForm(){
  let monsterForm = document.createElement('form')
    monsterForm.id = "monster-form"
    let nameField = document.createElement('input')
      nameField.id = "name"
      nameField.placeholder = "name..."
      monsterForm.appendChild(nameField)
    let ageField = document.createElement('input')
      ageField.id = "age"
      ageField.placeholder = "age..."
      monsterForm.appendChild(ageField)
    let descriptionField = document.createElement('input')
      descriptionField.id = "description"
      descriptionField.placeholder = "description..."
      monsterForm.appendChild(descriptionField)
    let button = document.createElement('button')
      button.innerText = "Create"
      monsterForm.appendChild(button)
  monsterFormDiv().appendChild(monsterForm)
}

//handlers

function handleMonsterForm(e){
  e.preventDefault()
  let name = document.querySelector('#name').value
  let age = document.querySelector('#age').value
  let description = document.querySelector('#description').value
  data = {
    "name": name,
    "age": age,
    "description": description
  }
  fetch(`http://localhost:3000/monsters`,{
    method:'POST',
    body: JSON.stringify(data),
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(r => r.json())
  .then(newMonster => console.log(newMonster))
  .then(monsterForm().reset)
}

function handleBackButton(e){
  e.preventDefault()
  clearNode(monsterContainer())
  let num = forwardButton().dataset.id--
  if(num == 0){
    alert("Ain't no monsters here")
  }
  else{
    getMonsters(num)
  }
}

function handleForwardButton(e){
  e.preventDefault()
  clearNode(monsterContainer())
  let num = ++forwardButton().dataset.id
  getMonsters(num)
}

function clearNode(node){
  while(node.firstChild){
    node.removeChild(node.firstChild)
  }
}
