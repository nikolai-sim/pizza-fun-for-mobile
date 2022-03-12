import request from "superagent";

export function getWords() {
  return request.get('https://random-word-api.herokuapp.com/all')
  .then(res => res.body)
}