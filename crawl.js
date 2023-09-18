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
  return 'please enter a valid URL'
    
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


async function crawlPage(baseURL, current_URL, pages){
 

  const urlObjBase = new URL(baseURL)
  const urlObjCurent = new URL(current_URL)
  if ((urlObjBase.hostname) !== (urlObjCurent.hostname)){
    return pages 
  }

  const normalizedCurrent= normalizeURL(current_URL)
  if (pages[normalizedCurrent] > 0 ){
    pages[normalizedCurrent]++
  return pages
}

if (current_URL === baseURL){
  pages[normalizedCurrent] = 0
} else {
  pages[normalizedCurrent] = 1
}


console.log(`actively crawling: ${current_URL}`)
 
  try {
    const resp = await fetch(current_URL)

    if (resp.status > 399){
      console.log(`error in fetch with status code: ${resp.status} on page: ${current_URL}`)
      return pages
    } 
    const contentType = resp.headers.get("content-type")
    if (!contentType.includes("text/html")){
      console.log(`non html response, content type: ${contentType}, on page: ${current_URL}`)
      return pages
    }

    const htmlBody = await resp.text()

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)
    for (const nextURL of nextURLs){
      pages = await crawlPage(baseURL, nextURL, pages)

    }

  } catch (error) {
      console.log(`error in fetch: ${error.message}, on page: ${current_URL}`)
  }

  return pages
}










module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }