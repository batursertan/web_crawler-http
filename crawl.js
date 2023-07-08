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
  return 'please enter a valid URL(https included)'
    
}
}


function getURLsFromHTML(htmlBody, baseURL){
  const urls = []
  const dom = new JSDOM(htmlBody)
  const linkElements = dom.window.document.querySelectorAll('a')
  for (const linkElement of linkElements){
    if(linkElement.href.slice(0,1)=== "/"){
      //relative url
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`)
        urls.push(urlObj.href)
      } catch (error) {
        console.log(`error with relative url: ${error.message}`)
        
      }
      
    }
    else{
      //absolute
      try {
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href)
      } catch (error) {
        console.log(`error with absolute url: ${error.message}`)
        
      }
     
    }
    
  }
  return urls
}

















module.exports = {
    normalizeURL,
    getURLsFromHTML
  }