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

