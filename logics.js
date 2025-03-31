console.log("Main.js working");

const populate = async (value, currency) => {
    let myStr = "";
    let url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_7UStkUqQNBmahSoy8K635tE3Sjr5fK1UVPmVloZ2&base_currency=${currency}`;

    try {
        let response = await fetch(url);
        let rJson = await response.json();

        document.querySelector(".output").style.display = "block";

        for (let key of Object.keys(rJson["data"])) {
            myStr += `<tr>
                        <td>${key}</td>
                        <td>${rJson["data"][key]["code"]}</td>
                        <td>${(rJson["data"][key]["value"] * value).toFixed(2)}</td>
                    </tr>`;
        }
        
        document.querySelector("tbody").innerHTML = myStr;

    } catch (error) {
        alert("Error fetching exchange rates! Please try again.");
        console.error(error);
    }
};

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    const value = parseFloat(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;

    if (isNaN(value) || value <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    populate(value, currency);
});