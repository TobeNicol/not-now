
const settingsBtn = document.querySelector('#settingsbtn');
const supportBtn = document.querySelector('#supportbtn');
const blockBtn = document.querySelector('#blockbtn');
const pauseBtn = document.querySelector('#pausebtn');
// const rateBtn = document.querySelector('#ratebtn');

//Open setting/options page on click.
settingsBtn.addEventListener('click', ()=>{
    if (chrome.runtime.openOptionsPage) { 
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
})

//Block current site
blockBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    blockBtn.style.backgroundColor = 'red';
    //find the url of current tab
    getSiteToBlock()

})

supportBtn.addEventListener('click', e=> window.open('https://www.buymeacoffee.com/tobe', '_blank'))
// rateBtn.addEventListener('click', e=> window.open('', '_blank'))


function getSiteToBlock(){
chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
      let urlOfSite =  (new URL(tabs[0].url)).hostname;
      blockSite(urlOfSite);
      chrome.tabs.reload()
      });

}

function blockSite(url){
  chrome.storage.local.get(['blockedSites'], function(sitesToBlock){ 
      const findItem = sitesToBlock.blockedSites.find(item=> item.site === url) //check if item is in storage already
      if(!findItem){  // prevents duplicates
        chrome.storage.local.set({'blockedSites': [...sitesToBlock.blockedSites, {site: url}]  },function(){
          console.log('Added to blocked sites');
         })
      }


  })
}







