const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
  if (process.argv.length < 3){
    console.log("please provide a website")
    process.exit(1)
    }
  
  if (process.argv.length > 3){
    console.log("please provide only one website at a time")
    process.exit(1)
    }
  
  const baseURL = process.argv[2]  


  console.log(`starting crawling of ${baseURL}`) 

  const pages = await crawlPage(baseURL, baseURL, {})
  printReport(pages)
  }
  


  main()