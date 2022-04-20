const USER_ID = 12

export const URL_BACKEND = {
  url_user : `http://localhost:3000/user/${USER_ID}`,
  url_activity : `http://localhost:3000/user/${USER_ID}/activity`,
  url_sessions : `http://localhost:3000/user/${USER_ID}/average-sessions`,
  url_performance : `http://localhost:3000/user/${USER_ID}/performance`
}


export const URL_MOCKED = {
  url_user : `../mock/${USER_ID}/user.json`,
  url_activity : `../mock/${USER_ID}/activity.json`,
  url_sessions : `../mock/${USER_ID}/sessions.json`,
  url_performance : `../mock/${USER_ID}/performance.json`
}
