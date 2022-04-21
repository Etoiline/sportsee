const URL_BACKEND = {
  url : 'http://localhost:3000/user/',
  url_user : '',
  url_activity : '/activity',
  url_sessions : '/average-sessions',
  url_performance : '/performance'
}


const URL_MOCKED = {
  url : '../mock/',
  url_user : '/user.json',
  url_activity : '/activity.json',
  url_sessions : '/sessions.json',
  url_performance : '/performance.json'
}

export function returnURL(userID, type) {
  return (URL_BACKEND['url']+userID+URL_BACKEND[type])

}