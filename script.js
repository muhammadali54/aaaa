import movies from './movies.js'

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

let kartochki = document.querySelector('.kartochki')
let input = document.querySelector('.thing input')
let sort = document.querySelector('.sortName')
let sort2 = document.querySelector('.sortYear')
let sortCategory = document.querySelector('.sortCategory')


function generator(arr) {
  kartochki.innerHTML = ''

  arr.forEach(movie => {
    let card = document.createElement('div')
    card.className = 'card'

    card.innerHTML = `
      <img src="deadpul.jpg" alt="">
      <h1>${movie.Title}</h1>
      <div class="info">
        <p>${movie.movie_year}</p>
        <p class="rating">⭐️ ${movie.imdb_rating}</p>
        <p>${movie.runtime} min</p>
      </div>
      <div class="category">
        ${movie.Categories}
      </div>
      <button class="btn">More info</button>
    `

    kartochki.append(card)
 
  })
}

generator(movies)



input.addEventListener('input', () => {
  let value = input.value.toLowerCase().trim()
  let filtered = movies.filter(movie =>
    movie.fulltitle.toLowerCase().includes(value)
  )
  generator(filtered)
})



sort2.addEventListener('change', () => {
  if (sort2.value === 'new') {
    movies.sort((a, b) => parseFloat(b.movie_year) - parseFloat(a.movie_year))
  } else if (sort2.value === 'old') {
    movies.sort((a, b) => parseFloat(a.movie_year) - parseFloat(b.movie_year))
  }
  generator(movies)
})
sort.addEventListener('change', () => {
  if (sort.value === 'a-z') {
    movies.sort((a, b) => a.fulltitle.localeCompare(b.fulltitle))
  } else if (sort.value === 'z-a') {
    movies.sort((a, b) => b.fulltitle.localeCompare(a.fulltitle))
  }
  generator(movies)
})
sortCategory.addEventListener('change', () => {
  if (sortCategory.value === 'all') {
    generator(movies)
  } else {
    let filtered = movies.filter(movie =>
      movie.Categories.includes(sortCategory.value)
    )
    generator(filtered)
  }
})
