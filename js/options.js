const form = document.querySelector('#settings-form');
const settingsText =  document.querySelector('#settings__text');
const saveBtn =  document.querySelector('#settings-form__save');



//add blocked sites to document
chrome.storage.local.get(['blockedSites'], function(sites){
    if(sites.blockedSites.length > 0){
        for(let i = 0;i < sites.blockedSites.length;i++){
            createInput(sites.blockedSites[i])
        }
    } else{
        settingsText.innerHTML = 'You haven\'t blocked any sites yet';
        saveBtn.style.display = 'none';
    }
})

function createInput(site){
    const div  = document.createElement('div');
    const input  = document.createElement('input');
    div.className = 'settings-form__item'
    input.type = 'checkbox';
    input.value = site.site;
    input.name = 'blocked';
    const label = document.createElement('label');
    label.innerHTML = site.site;
    div.appendChild(input)
    div.appendChild(label)
    form.insertBefore( div , form.firstChild)
}


//event listener
saveBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    saveSettings()
    chrome.tabs.reload()
})


//save
function saveSettings(){
   let name = getData() //
    chrome.storage.local.get(['blockedSites'], function(sites){
        let blockArr = []
        sites.blockedSites.forEach((s)=>{
            if(!name.includes(s.site)) blockArr.push(s);
        })
        console.log('blockarr:', blockArr)
        chrome.storage.local.set({'blockedSites': blockArr}, function(){
        })
    })
}

//get data
function getData(){
    const myForm = new FormData(form);
    const name = myForm.getAll('blocked');
    return name //array
}

