let labelTabs = (tabIndex = null) => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      
      let title = (tab.index + 1).toString() + " | " + tab.title.slice(tabIndex === tab.index ? 0 : 4);

      chrome.scriping.executeScript({
        target: { tabId: tab.id },
        function: (title) => {
          document.title = title;
        },
        args: [title]
      });
    });
  });
}

chrome.tabs.onCreated.addListener((tab) => {
  labelTabs(tab.index);
});

chrome.tabs.onRemoved.addListener(() => {
  labelTabs();
});

chrome.tabs.onMoved.addListener(() => {
  labelTabs();
});
