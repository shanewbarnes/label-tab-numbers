let labelTabs = (tabIndex = null) => {
  browser.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
 
      let title = (tab.index + 1).toString() + " | " + tab.title.slice(tabIndex === tab.index ? 0 : 4);

      browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: (title) => {
          document.title = title;
        },
        args: [title]
      });
    });
  });
}

browser.tabs.onCreated.addListener((tab) => {
  labelTabs(tab.index);
});

browser.tabs.onRemoved.addListener(() => {
  labelTabs();
});

browser.tabs.onMoved.addListener(() => {
  labelTabs();
});
