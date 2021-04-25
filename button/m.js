const s = {
    hBorders: 160
};

const res = {
    theater: {
        FHD: { // 1080p
            width: 1920,
            height: 1080
        },
        QHD: { // 1440p
            width: 2560,
            height: 1440
        }
    }
};

// Update status
async function updateStatusText() {
    let ws = document.getElementById("tabSize");
    let bs = document.getElementById("browserSize");

    let tabs = await chrome.tabs.query({active: true, currentWindow: true});
    let curwin = await chrome.windows.getCurrent();

    ws.innerText = (tabs[0].width + "x" + tabs[0].height);
    bs.innerText = (curwin.width + "x" + curwin.height);
}

async function r(nRes) {
    let curwin = await chrome.windows.getCurrent();
    let tabs = await chrome.tabs.query({active: true, currentWindow: true});

    // Difference between outer and inner
    wdiff = curwin.width - tabs[0].width;
    hdiff = curwin.height - tabs[0].height;

    update = {width: wdiff + nRes.width};
    if((newHeight = nRes.height + hdiff + s.hBorders) > tabs[0].height) {
        update.height = newHeight;
    } 

    chrome.windows.update(curwin.id, update);
}

updateStatusText();
document.getElementById("b1080").addEventListener("click", () => r(res.theater.FHD));
document.getElementById("b1440").addEventListener("click", () => r(res.theater.QHD));
