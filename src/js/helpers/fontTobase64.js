import axios from 'axios'

export default (path) => {
  return new Promise(resolve => {
    axios.get(path).then(response => {

    })
  })
}
