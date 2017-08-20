import Auth from '../modules/Auth';

function postSignup( payload){
  return fetch( '/auth/signup', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( payload)
  })
  .then( checkStatus)
  .then( parseJSON);
}

function postLogin(payload){
  return fetch( '/auth/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( payload)
  })
  .then( checkStatus)
  .then( parseJSON);
}

function postChangePassword( payload){
  console.log( "postchange password payload:", payload);
  return fetch( '/auth/change', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( payload)
  })
  .then( checkStatus)
  .then( parseJSON);
}
function getMyPolls( query) {
  let q = "";
  if( query.email){
    q = "?email="+query.email;
  }
  return fetch( '/api/mypolls'+q, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    }
  })
  .then( checkStatus)
  .then( parseJSON);
}
function getAllPolls(){
  return fetch( '/apo/polls')
    .then( checkStatus)
    .then( parseJSON);
}
function savePoll( poll){
  const payload = { ...poll, owner: Auth.getEmail()};
  console.log( "savePoll payload:", payload);
  return fetch( '/api/poll', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${Auth.getToken()}`
    },
    body: JSON.stringify( payload)
  })
  .then( checkStatus)
  .then( parseJSON);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.error(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Actions = {
  postSignup, postLogin, postChangePassword,
  getAllPolls, getMyPolls, savePoll
};
export default Actions;
