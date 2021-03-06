if(localStorage.hasOwnProperty("cursor")){
    switchCursors(localStorage.getItem("cursor"))
}

function switchCursors(cursor){
  
    localStorage.setItem("cursor", cursor)
  
    let normal = ""
    let pointer = "pointer"

    if(cursor == ""){
        
    }else{
        normal = "url(assets/"+ cursor +"Cursor/normal.cur),default"
        pointer = "url(assets/"+ cursor +"Cursor/pointer.cur),pointer"
    }
        document.getElementsByTagName("body")[0].style.cursor = normal;

        var elms = document.getElementsByTagName("*");
        var n = elms.length;
        for(var i = 0; i < n; i ++) {

            if(window.getComputedStyle(elms[i]).cursor.includes("pointer")) {
                elms[i].style.cursor = pointer;
            }

        }
    
}

document.getElementById('file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // convert file to base64 String
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      // store file
      console.log(base64String.length)
      localStorage.setItem('wallpaper', base64String);
      // display image
      document.body.style.backgroundImage = `url(data:image/png;base64,${base64String})`;
    };
    reader.readAsDataURL(file);
  });

  if(localStorage.hasOwnProperty("wallpaper")){
    document.body.style.backgroundImage = `url(data:image/png;base64,${localStorage.getItem("wallpaper")})`
  }

  document.getElementById("openImgUpload").addEventListener("click",()=>{
      document.getElementById('file').click()
  })

  document.getElementById("removeBackground").addEventListener("click",()=>{
      document.body.style.backgroundImage = ""
      localStorage.removeItem('wallpaper')
  })



function colorSlider(event){
    let out = event.currentTarget.parentNode.children[2]
    out.value = event.target.value
    showPreview()
}

function colorInput(event){
    let out = event.currentTarget.parentNode.children[1]
    out.value = event.target.value
    showPreview()
}

function showPreview(){
    let sliders = document.getElementsByClassName("range")

    document.getElementById("windowPreview").style.backgroundColor = `rgb(${sliders[0].value + " " + sliders[1].value + " " + sliders[2].value})`
    
    let shadows = calculateShadow(sliders[0].value,sliders[1].value,sliders[2].value)
    document.getElementById("windowPreview").style.boxShadow = `inset -1px -1px rgb(${shadows[0]}), inset 1px 1px rgb(${shadows[1]}), inset -2px -2px rgb(${shadows[2]}), inset 2px 2px rgb(${shadows[3]})`
}

function calculateShadow(r,g,b){
    let boxshadow = []
    let percentages = [5.20,116.14,66.66,117.18]
    

    for (let index = 0; index < percentages.length; index++) {
        let newR = r
        let newG = g
        let newB = b

        newR = Math.floor(newR / 100 * percentages[index])
        newG = Math.floor(newG / 100 * percentages[index])
        newB = Math.floor(newB / 100 * percentages[index])
        
        boxshadow[index] = newR + " " + newG + " " + newB 
    }

    return boxshadow
}

function colorFromButton(){
   let bgColor = document.getElementById("windowPreview").style.backgroundColor

   setColor(bgColor)
}

if(localStorage.hasOwnProperty("BGColor")){
    setColor(localStorage.getItem("BGColor"))
}

function setColor(color){
    console.log(color)
    let sliders = document.getElementsByClassName("range")
    let addStyle = document.getElementsByTagName("style")[0]
    let shadows = calculateShadow(sliders[0].value,sliders[1].value,sliders[2].value)
    addStyle.innerHTML = `
    .window,.dropdown,button,.tab,#clock{
        background-color:${color};
        box-shadow:inset -1px -1px rgb(${shadows[0]}), inset 1px 1px rgb(${shadows[1]}), inset -2px -2px rgb(${shadows[2]}), inset 2px 2px rgb(${shadows[3]})
    }
    .openTab{
        box-shadow:inset -1px -1px rgb(${shadows[3]}), inset 1px 1px rgb(${shadows[2]}), inset -2px -2px rgb(${shadows[1]}), inset 2px 2px rgb(${shadows[0]})
    }
    `
}