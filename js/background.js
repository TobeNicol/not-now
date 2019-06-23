

chrome.runtime.onInstalled.addListener(function(){ //alternative to this is checking for no runtime error
    chrome.storage.local.set({'blockedSites': []},function(){
      })
})


chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab){
        chrome.storage.local.get(['blockedSites'], function(sites){
            if(sites){
                //find if tab is blocked
                const filteredTab =  sites.blockedSites.filter(item=> item.site ===  ( (new URL(tab.url) ).hostname  )); 
            
                //if tab is blocked
                if(filteredTab.length > 0){
                    //remove tab
                    chrome.tabs.remove(id, function(){
                        if(!chrome.runtime.lastError){ //handle this better
                            chrome.notifications.create({'type': 'basic', 'title': 'Not Now..', 'message': 'Focus.', 'iconUrl': './images/icon16.png' })
                        }
                    })
    
                }

            }
      
           })
})