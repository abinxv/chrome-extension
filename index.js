let myLeads = []
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// storing it as a js array so it stays in local 
// storage even when we reload the page
// a local mini database 
 
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// to show on page
function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
            `
        ulEl.innerHTML = listItems
    }
}

inputBtn.addEventListener("click", function (){
    myLeads.push(inputEl.value) 
    render(myLeads)  
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    // we do this cuz local storage can only store str
    //console.log(localStorage.getItem("myLeads"))
})

deleteBtn.addEventListener("dblclick", function(){
    console.log("double click")
    localStorage.clear()
    myLeads = []
    ulEl.innerHTML = ""
    render(myLeads)
})



tabBtn.addEventListener("click",function (){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        // means out of the multiple windows chose curr window
        // and choose active tab
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})
