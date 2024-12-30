let data = undefined
let temp = undefined
const tableHeaders = ["Icon","Name","Full Name","Powerstats","Race","Gender","Height","Weight","Place Of Birth","Alignment"]
const heroInfo = ["images.xs","name","biography.fullName","powerstats","appearance.race","appearance.gender","appearance.height","appearance.weight","biography.placeOfBirth","biography.alignment"]
 async function Fetching() {
    const link = "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json"
    await fetch(link)
    .then(async (response) =>{
        data = await response.json()
        temp = data
    })
    .catch((err)=>{
        console.log(err);
    })
}

 function Display() { 
    const table = document.createElement("table") 
    document.body.append(table)
    SetHeader(table)
    SetHeros(table)
}

function SetHeros(table) {
    temp.forEach((hero)=>{
        const tRow = document.createElement("tr")
        table.append(tRow)
        heroInfo.forEach((info)=>{
            const td = document.createElement("td")
            tRow.append(td)
            const nodes = info.split(".")
            const firstChild = nodes[0] 
            let information = hero[firstChild];
            
            if (nodes.length === 2){
                const secondChild = nodes[1]
                information = information[secondChild]
            }
            if (information instanceof Object ){
                if (information instanceof Array ){
                    td.textContent = [...information]
                }else{
                    const keys = Object.keys(information)
                    keys.forEach((key)=>{
                        td.textContent += key + ": " + information[key] + " "
                    })
                    information =  JSON.stringify(information)
                }
            }else if (info === "images.xs"){
                const image = document.createElement("img")
                td.append(image)
                image.src = information
            }else{
                td.textContent = information
            }
        })
    })
}

function filter(){
    document.querySelector("select").addEventListener("change",()=>{
        let val = document.querySelector("select").options[document.querySelector("select").selectedIndex].value;
        if (val === "all"){
            temp = data
        }else{
            const n = Number(val)
            temp = data.slice(0,n)
            console.log(temp);
        }
    })
}

function SetHeader(table) {
    const tRow = document.createElement("tr")
    table.append(tRow)
    tableHeaders.forEach((header)=>{
        const tHead = document.createElement("th")
        tHead.textContent = header
        tRow.append(tHead) 
    }) 
} 


await Fetching()
filter()
Display()

