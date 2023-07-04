const { JSDOM } = require('jsdom')

function normalizeURL(urlStr){
  try {  
  const urlObj = new URL(urlStr)
  const path = `${urlObj.hostname}${urlObj.pathname}`
  if (path.length > 0 && path.slice(-1) === '/'){
    return path.slice(0,-1)
  }
  return path
} 
catch (error) {
  return 'please enter a valid URL(http included)'
    
}
}
module.exports ={
    normalizeURL
}

function getURLsFromHTML(htmlBody, baseURL){
  const dom = new JSDOM(htmlBody)
  const foundURL = dom.window.document.querySelector("a")
  
  return foundURL
}

















module.exports = {
    normalizeURL
  }