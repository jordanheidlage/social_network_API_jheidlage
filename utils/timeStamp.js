function unix(){
  return Math.floor(
    Date.now()/1000
  )
}

console.log(new Date(unix() * 1000).toLocaleDateString())