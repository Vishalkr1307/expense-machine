export function premiumFeature (){
    const token=localStorage.getItem("token")
    const income=document.getElementById("income");
    const expense=document.getElementById("expense")
    income.addEventListener("click",handleIncome)
    expense.addEventListener("click",handleExpense)
    const formData=document.getElementById("form")
    function handleIncome(){
        formData.setAttribute("class", "d-flex")
       let label= document.querySelector("label")
       label.textContent="Created By"
       let data={
        description:document.getElementById("description").value,
        amount:document.getElementById("price").value,
        date:document.getElementById("date").value
    }
    console.log(data)
        

    }
    function handleExpense(){
        // formData.setAttribute("class", "d-flex")
        
       let label= document.querySelector("label")
       label.textContent="expense By"
       let data={
           description:document.getElementById("description").value,
           amount:document.getElementById("price").value,
           date:document.getElementById("date").value
       }
      console.log(data)
       axios.post("/premium/addExpense",data,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
       }).then((res)=>{
        console.log(res.data);
       }).catch((err)=>{
        console.log(err.response.data)
       });
       
        
        

    }
    getDayaExpnse()
    function getDayaExpnse(){
        axios.get("/premium/getDayExpense",{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err.response.data)

        });

    }
    let month=document.getElementById("month")
    
    month.addEventListener("change",handleMonth)
    function handleMonth(event){
        console.log(event.target.value)

    }
    let year=document.getElementById("year")
    year.addEventListener("change",handleYear)
    function handleYear(event){
        console.log(event.target.value)
    }



}