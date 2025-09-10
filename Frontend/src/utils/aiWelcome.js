// AI Welcome Service
export const speakWelcome = (message) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(message)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8
    window.speechSynthesis.speak(utterance)
  }
}

export const getWelcomeMessage = (user = null) => {
  if (user) {
    return `Welcome back ${user.name}! Great to see you again at AadiiCart. Happy shopping!`
  }
  return "Welcome to AadiiCart! Your one-stop destination for amazing products. Feel free to browse our collection or login to get started."
}

export const getLoginSuccessMessage = (user) => {
  return `Hello ${user.name}! You have successfully logged in to AadiiCart. Enjoy your shopping experience!`
}