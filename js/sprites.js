let me = document.getElementById('me');
let speech = document.getElementById('speechBubble');

let facts = [
  "Press the left mouse button to click on icons.",
  "I am not a real person, just an image.",
  "Press the right mouse button...for nothing. Why would i make the right mouse button do something special?",
  "Hover your mouse over the start button for some fun features!",
  "You can minimize tabs using the minimize button, try it!",
  "Don't worry, this isn't actually a Windows 98 desktop. I'm just that good at making websites!",
  "Feel free to look around, but try not to break anything. I live here!",
  "No, i don't go away!",
  "I have a bachelor's degree in Creative Media and Game Technologies"
]
  
const myObject = {
    idle1: {
        idle_left: { 
            sprite: 'Me_idle_left.gif', 
            delayRange: [2000, 10000] 
        }
    },
    idle2: {
        idle_right: { 
            sprite: 'Me_idle_right.gif', 
            delayRange: [2000, 10000] 
        }
    },
    talk: {
        alert: { 
            sprite: 'Me_alert.gif', 
            delayRange: [2000, 2000] 
        },
        talk: { 
            sprite: 'Me_talk.gif', 
            delayRange: [10000, 15000],
            startFunction: startSpeech,
            endFunction: endSpeech 
        },
    },
    yoyo: {
      yoyo:{
        sprite: 'Me_yoyo.gif',
        delayRange: [13500,13500],
      }
    },
    // paper_plane:{
    //   plan:{
    //     sprite: 'Me_paper_airplane.gif',
    //     delayRange: [14500,14500],
    //   }
    // }
  };
  
  function getRandomDelay(min, max) {
    const delay = Math.floor(Math.random() * (max - min + 1) + min);
    return Math.round(delay / 500) * 500; // Round delay to the nearest multiple of 0.5 seconds (500 milliseconds)
  }

  async function iterateObjectWithDelay(obj) {
    while (true) {
      const groupKeys = Object.keys(obj);
      const selectedGroupKey = groupKeys[Math.floor(Math.random() * groupKeys.length)];
      const selectedGroup = obj[selectedGroupKey];
      
      const objectKeys = Object.keys(selectedGroup);
      
      for (const objectKey of objectKeys) {
        const entry = selectedGroup[objectKey];

        if (document.hidden) {
          await new Promise(resolve => {
            document.addEventListener('visibilitychange', function handler() {
              if (!document.hidden) {
                document.removeEventListener('visibilitychange', handler);
                resolve();
              }
            });
          });
        }

        me.setAttribute("src","assets/Sprites/" + entry.sprite)
        
        if (entry.startFunction && typeof entry.startFunction === 'function') {
          entry.startFunction(); // Execute start function
        }
        
        const [minDelay, maxDelay] = entry.delayRange;
        const delay = getRandomDelay(minDelay, maxDelay);
        
        // Wait for the specified delay before proceeding to the next iteration
        await new Promise(resolve => setTimeout(resolve, delay));
        
        if (entry.endFunction && typeof entry.endFunction === 'function') {
          entry.endFunction(); // Execute end function
        }
      }
    }
  }

  async function startSpeech(){
    let middle = document.getElementById('middle');
    speech.style.visibility = 'visible';
    middle.innerHTML = ""; 
    let fact = facts[Math.floor(Math.random() * facts.length)];    
    let factArray = fact.split("")
    for (const letter of factArray) {

      middle.innerHTML += letter;

      await new Promise(resolve => setTimeout(resolve, 40));
    }
  }

  function endSpeech(){
    speech.style.visibility = 'hidden';
  }
  
  // Usage
  iterateObjectWithDelay(myObject);


