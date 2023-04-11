// ________________ Let's Build Budegt App ______________

// budget-variables
const total_amount_inp = document.getElementById('total_amount');
const total_amount_button = document.getElementById('total_amount_button');
const budget_error = document.getElementById('budget_error');

// expenses-variables
const check_amount_button = document.getElementById('check_amount_button');
const product_title_inp = document.getElementById('product_title');
const product_amount_inp = document.getElementById('product_amount');
const expenses_error = document.getElementById('Expenses_error');

// List parent
const list_parent = document.querySelector('.list_parent');

// display-variables
const display_amount = document.getElementById('amount');
const display_expenses = document.getElementById('expenses');
const display_balance = document.getElementById('balance');

// Initial Val
let sumOfExpenses = 0;
let tempbudget = 0;
let expenses_array = [];

// Add expenses in list-box
function addListItems(expensesName, expensesCost){
   let list = document.createElement('div');
   list.classList.add('list','flex-space');
   list.innerHTML =
            `<h4 class="product_title">${expensesName}</h4>
            <p class="product_cost">${expensesCost}</p>
            <div class="l_buttons">
                <button class="edit" onclick=edit(event)>edit</button>
                <button class="del" onclick=del(event) style="color: var(--red);">del</button>
            </div>`
    list_parent.appendChild(list);

}

// Sum the expenses & return 
function checkBalance(){
    sumOfExpenses = expenses_array.reduce((sum, expenses_array)=>{
            return sum = sum + expenses_array.amount;
    },0);
    display_expenses.textContent = sumOfExpenses;
    display_balance.textContent = tempbudget-sumOfExpenses;
}

// Delete the expenses
function del(e){
    // target the click list
    let list = e.target.parentElement.parentElement;
    // get list-parent childrens
    let listChild = document.querySelectorAll('.list_parent')[0].children;
    // get index of target list
    let index = Array.from(listChild).indexOf(list);
    // remove the list from array and listitems
    expenses_array.splice(index,1);
    list.remove();
    checkBalance();
}

//Edit the expenses
function edit(e){

    let checkdisable =  document.querySelectorAll('.edit')[0].getAttribute("disable-data");
    if(checkdisable == 'true'){
        // target the click list
        let list = e.target.parentElement.parentElement;
        // get list-parent childrens
        let listChild = document.querySelectorAll('.list_parent')[0].children;
        // get index of target list
        let index = Array.from(listChild).indexOf(list); 

        // add in expenses box
        product_title_inp.value = expenses_array[index].name;
        product_amount_inp.value = expenses_array[index].amount;
        
        // remove the list from array and listitems
        expenses_array.splice(index,1);
        list.remove(); 
        checkBalance();
        disableEdit(false);
    }
    else{
        alert('please, edit current expenses');
    }
} 

// make all edit disable utill one's not done
function disableEdit(bool){
    let editbuttons = document.querySelectorAll('.edit');
    editbuttons.forEach(btn=>{
       btn.setAttribute("disable-data",bool);
    });
}

// Get the budget amount & display
total_amount_button.addEventListener('click',()=>{

    if(total_amount_inp.value !='' && total_amount_inp.value > 0){
        
       budget_error.classList.add('hide'); 
       tempbudget = total_amount_inp.value;
       display_amount.textContent = tempbudget;
       display_balance.textContent = tempbudget - sumOfExpenses;
       total_amount_inp.value ='';
    }
    else{
        budget_error.classList.remove('hide'); 
    }


})

// Push the expenses & get balance
check_amount_button.addEventListener('click',()=>{
    
    if(product_title_inp.value !='' && product_amount_inp.value > 0){
        // push ele in array
        expenses_array.push({
            name:product_title_inp.value,
            amount: Number(product_amount_inp.value)
        });
        expenses_error.classList.add('hide');
        addListItems(product_title_inp.value, product_amount_inp.value);
        disableEdit(true);
        checkBalance();
        product_title_inp.value ='';
        product_amount_inp.value ='';
    }
    else{
        expenses_error.classList.remove('hide');
    }
})