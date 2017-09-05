const url = "https://sneller-dan-max.firebaseio.com/highscore.json"

const api = {
  saveHighscores(highscores) {
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(highscores)
    }).then(res => res.json())
  },
  getHighscores() {
    return fetch(url).then(resp => resp.json())
  },
  saveInitialData(initialData) {
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(initialData)
    }).then(res => res.json())
  }
}

// const initialData = [
//   { name: "Maxi", record: "0.330" },
//   { name: "Maxi", record: "0.383" },
//   { name: "Maxi", record: "0.391" },
//   { name: "Maxi", record: "0.420" },
//   { name: "Maxi", record: "0.455" },
//   { name: "Maxi", record: "0.500" },
//   { name: "Maxi", record: "0.900" },
//   { name: "Maxi", record: "0.900" },
//   { name: "Maxi", record: "0.900" },
//   { name: "Maxi", record: "0.900" }
// ]

// api.saveInitialData(initialData)

export default api
