let myURLs = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const URLsFromLocalStorage = JSON.parse( localStorage.getItem("myURLs") )
const tabBtn = document.getElementById("tab-btn")

if (URLsFromLocalStorage) {
    myURLs = URLsFromLocalStorage
    render(myURLs)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myURLs.push(tabs[0].url)
        localStorage.setItem("myURLs", JSON.stringify(myURLs) )
        render(myURLs)
    })
})

function render(URL) {
    let listItems = ""
    for (let i = 0; i < URL.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${URL[i]}'>
                    ${URL[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myURLs = []
    render(myURLs)
})

inputBtn.addEventListener("click", function() {
    myURLs.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myURLs", JSON.stringify(myURLs) )
    render(myURLs)
})