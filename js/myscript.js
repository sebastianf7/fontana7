const form = document.getElementById("transactionForm")

form.addEventListener("submit", function (event) {
    //console.log(event);
    //alert("se detecto un envio del formulario") 
    //event.preventDefault();
    let transactionFormData = new FormData(form);
    let transactionObj = convertFormDatatToTransactionObj(transactionFormData)
    saveTransactionObj(transactionObj)
    insertRowInTransactionTable(transactionObj)
    //form.reset();
})

document.addEventListener("DOMContentLoaded", function (event) {
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArr.forEach(
        function (arrayElement) {
            insertRowInTransactionTable(arrayElement)
            console.log("se inserta el elemento")
        }
    )

})

    function convertFormDatatToTransactionObj(transactionFormData) {
        let tsSelector = transactionFormData.get("tsSelector")
        let transactionNumber = transactionFormData.get("transactionNumber");
        let transactionMaterial = transactionFormData.get("transactionMaterial");
        return {
            "tsSelector": tsSelector,
            "transactionNumber": transactionNumber,
            "transactionMaterial": transactionMaterial
        }
    }

    /*function insertRowTransactionTable(transactionFormData) {
        let transactionTableRef = document.getElementById("transactionTable");
        let newTransactionRowRef = transactionTableRef.insertRow(-1);
        let newTypeCellRef = newTransactionRowRef.insertCell(0)
        newTypeCellRef.textContent = transactionFormData.get("tsSelector");
    
        newTypeCellRef = newTransactionRowRef.insertCell(1);
        newTypeCellRef.textContent = transactionFormData.get("transactionNumber");
    
        newTypeCellRef = newTransactionRowRef.insertCell(2);
        newTypeCellRef.textContent = transactionFormData.get("transactionMaterial");
    }*/

    function insertRowInTransactionTable(transactionObj) {
        let transactionTableRef = document.getElementById("transactionTable");

        let newTransactionRowRef = transactionTableRef.insertRow(1);

        let newTypeCellRef = newTransactionRowRef.insertCell(0);
        newTypeCellRef.textContent = transactionObj["tsSelector"];

        newTypeCellRef = newTransactionRowRef.insertCell(1);
        newTypeCellRef.textContent = transactionObj["transactionNumber"];

        newTypeCellRef = newTransactionRowRef.insertCell(2);
        newTypeCellRef.textContent = transactionObj["transactionMaterial"];
    }

    function saveTransactionObj(transactionObj) {

        let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
        myTransactionArray.push(transactionObj);
        //convierto array de transaccion to json
        let transactionArrayJSON = JSON.stringify(myTransactionArray);
        //guardo my array de transaccion en formato JSON en el local storage
        localStorage.setItem("transactionData", transactionArrayJSON)
    }
