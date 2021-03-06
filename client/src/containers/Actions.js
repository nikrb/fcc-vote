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
  if( query.owner){
    q = "?owner="+encodeURIComponent( query.owner);
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
function getPoll( poll_name){
  return fetch( '/apo/poll?name='+encodeURIComponent( poll_name))
    .then( checkStatus)
    .then( parseJSON);
}
function savePoll( poll){
  let owner = Auth.getEmail();
  // user may not be owner, if they are logged in and are adding a new option
  if( poll.owner) owner = poll.owner;
  // TODO: shorthand, just owner
  const payload = { ...poll, owner: owner};
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
function deletePoll( id){
  const payload = { id: id};
  return fetch( '/api/depoll', {
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
function pollVote( poll_name, poll_owner, text, email){
  const payload = { name: poll_name, owner:poll_owner, vote: text, email: email};
  return fetch( '/apo/vote', {
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
  getAllPolls, getMyPolls, getPoll, savePoll, deletePoll, pollVote
};
export default Actions;
