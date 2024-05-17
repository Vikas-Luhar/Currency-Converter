const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll("#dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".From select");
const tocurr=document.querySelector(".To select");
for (let select of dropdowns) {
    for(currcode in countryList) {
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected ="selected";
        }else if(select.name === "to" && currcode === "INR"){
            newoption.selected ="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag=((element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode]
    let newSrc=`https://flagsapi.com/${countrycode}/shiny/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
});

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("#amount input");
    let amtVal=amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal =1;
        amount.value="1";
    }

    const URL = `${url}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    //console.log(response);

    let data = await response.json();
    //console.log(data);

    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    //console.log(rate);

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
})