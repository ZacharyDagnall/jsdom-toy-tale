let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const likeButton = document.querySelector(".like-button");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function renderOneToy(toy) {
    let div = document.createElement('div')
    div.innerHTML = `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
    toyCollection.append(div)

    let likeButton = div.querySelector(".like-btn");
    likeButton.addEventListener("click", function (event) {
      fetch(`http://localhost:3000/toys/${toy.id}`, { method: "PATCH", headers: { 'content-type': 'application/json' }, body: JSON.stringify({ likes: toy.likes += 1 }) })
        .then(response => response.json())
        .then(responseToy => {
          div.querySelector('p').textContent = `${responseToy.likes} Likes`
        })
    })

  }

  fetch(`http://localhost:3000/toys`)
    .then(response => response.json())
    .then(toys => {
      toys.forEach(function (toy) {
        renderOneToy(toy)
      })
    })

  toyFormContainer.addEventListener("submit", function (event) {
    event.preventDefault()
    let name = event.target[0].value
    let image = event.target[1].value
    let newToy = { name, image, likes: 0 }
    fetch(`http://localhost:3000/toys`, { method: "POST", headers: { 'content-type': 'application/json' }, body: JSON.stringify(newToy) })
      .then(response => response.json())
      .then(toy => renderOneToy(toy))
    event.target.reset()
  })

  // button, when clicked --> increase count , fetch PATCH

});
