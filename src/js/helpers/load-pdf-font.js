import axios from 'axios';

export default (path) => new Promise(resolve => {
  axios.get(path).then(response => {
    resolve(response.data.font);
  })
})
