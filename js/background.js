

chrome.runtime.onInstalled.addListener(function(){ //alternative to this is checking for no runtime error
    chrome.storage.local.set({'blockedSites': [], 'isPaused': false},function(){
      })
})

chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab){
    chrome.storage.local.get(['blockedSites', 'isPaused'], function(sites){
        if(!sites.isPaused){
                //check if tab is blocked
                const filteredTab =  sites.blockedSites.filter(item=> item.site ===  ( (new URL(tab.url) ).hostname  ));
                //if tab is blocked
                if(filteredTab.length > 0) removeTab(id);
        }
    })
})

//listen for changes in pause.
chrome.storage.onChanged.addListener(function(changes, namespace) {
        const value = changes.isPaused;
        if(value && !changes.isPaused.newValue) {
          chrome.storage.local.get(['blockedSites'], function(sites){
            chrome.tabs.query({}, function (tabs) {
                const blockedIds = [];
                tabs.forEach(tab=>{
                    let urlOfSite =  (new URL(tab.url)).hostname;
                     if (sites.blockedSites.includes( urlOfSite )) blockedIds.push(tab.id);
                })
                chrome.tabs.remove(blockedIds)      
                });
          })

        }
 
});

  function removeTab(id){
    //remove tab
    chrome.tabs.remove(id, function(){
        if(!chrome.runtime.lastError){ //handle this better
            chrome.notifications.create({'type': 'basic', 'title': 'Not Now..', 'message': 'Don\'t you have something else to do ?', 'iconUrl': './images/icon16.png' })
        }
    })
  }