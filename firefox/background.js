let tabSet = new Set();

let labelTabs = async () => {
  let labelLength = 4;

  return await browser.tabs.query({}).then((tabs) => {
    tabs.forEach((tab) => {
      let firstLabel = !tabSet.has(tab.id);
      let title = (tab.index + 1).toString() + " | " + tab.title.slice(labelLength);

      if (!firstLabel) {
        console.log("2")
        labelTab(tab.id, title);
      }
    });
  });
}

let labelTab = (tabId, title) => {
  browser.scripting.executeScript({
    target: { tabId: tabId },
    func: (title) => {
      document.title = title;
    },
    args: [title]
  });
}
browser.tabs.onRemoved.addListener((tabId) => {
  tabSet.delete(tabId);
  labelTabs();
});

browser.tabs.onMoved.addListener((tabId) => {
  labelTabs();
});

browser.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (!tabSet.has(tabId) && tab.status === "complete") {
    console.log("1");
    labelTabs()
      .then(() => tabSet.add(tabId))
      .then(() => labelTab(tabId, (tab.index + 1).toString() + " | " + tab.title));
    /*let title = (tab.index + 1).toString() + " | " + tab.title
    console.log(promise);
    tabSet.add(tabId);
    console.log("3");
    labelTab(tabId, title);
    */
  }
});
