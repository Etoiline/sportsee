const URL_BACKEND = {
  url : 'http://localhost:3000/user/',
  url_user : '',
  url_activity : '/activity',
  url_sessions : '/average-sessions',
  url_performance : '/performance'
}


const URL_MOCKED = {
  url : process.env.PUBLIC_URL+'/mock/',
  url_user : '/user.json',
  url_activity : '/activity.json',
  url_sessions : '/sessions.json',
  url_performance : '/performance.json'
}

/**
         * Return url accordind to data source (backend or mocked)
         * 
         * @param userId : user id
         * @param source : source of data (MOCKED or BACKEND)
         * @param type : type of ressource requested
         * 
         * @return url : full url requested
         *    
         */
export function returnURL(userID, source, type) {
  if (source==='BACKEND'){
    var url = URL_BACKEND['url']+userID+URL_BACKEND[type]
  }
  else {
    url = URL_MOCKED['url']+userID+URL_MOCKED[type]
  }
  return (url)

}