if(localStorage.hasOwnProperty("cursor")){
    switchCursors(localStorage.getItem("cursor"))
}

let cursors = document.getElementsByClassName("cursorOptions")

for (let index = 0; index < cursors.length; index++) {
    cursors[index].addEventListener("click",fromMenu)
}

function fromMenu(event){
    switchCursors(event.target.closest("a").id)
}

function switchCursors(cursor){
  
    localStorage.setItem("cursor", cursor)

    if(cursor){
        // Create or update the style tag
        var styleTag = document.getElementById('customCursorStyle');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'customCursorStyle';
            document.head.appendChild(styleTag);
        }

        // Set the custom cursor styles
        styleTag.textContent = `
            body {
              cursor: url('assets/${cursor}Cursor/normal.cur'), auto !important;
            }
    
            .pointer {
              cursor: url('assets/${cursor}Cursor/pointer.cur'), pointer !important;
            }
        `;
    }

}

document.getElementById('file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // convert file to base64 String
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      // store file
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