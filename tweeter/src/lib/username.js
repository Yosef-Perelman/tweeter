const USERNAME_KEY = "tweeter-username";
const DEFAULT_USERNAME = "Yosef";

export function getUsername() {
  return localStorage.getItem(USERNAME_KEY) ?? DEFAULT_USERNAME;
}

export function setUsername(username) {
  localStorage.setItem(USERNAME_KEY, username);
}