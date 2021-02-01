import React, {useState} from 'react'
import  { nanoid } from 'nanoid'
interface expenseList{
  id:string;
  body:string;
  amount:number;
  type:boolean;
  createdAt:Date
}
function App() {
const amount=0;
const [state,setState]=useState(amount)
const [inputAmount,setInputAmount]=useState<number>(1)
const [itemName, setItemName]=useState('')
const [itemCount, setItemCount]=useState(1)
const [expenseList,setExpenseList]=useState<expenseList []>([])

const handlePush=()=>{
  const newList:expenseList[]=[...expenseList]
  if(itemName!==''){
      newList.push({id:nanoid(), body:itemName, amount:inputAmount*itemCount,type:false, createdAt:new Date()})
      setExpenseList(newList);
      setState(Number(state)-Number(inputAmount*itemCount)); }
}
const handlePush1=()=>{
  const newList:expenseList[]=[...expenseList]
  if(itemName!==''){
      newList.push({id:nanoid(), body:itemName, amount:inputAmount*itemCount,type:true, createdAt:new Date()})
      setExpenseList(newList);
      setState(Number(state)+Number(inputAmount*itemCount))
     }
}

const handleDelete=(id:string)=>{
const newList:expenseList []=[...expenseList]
    const newList1=newList.filter(x=>id!==x.id)
setExpenseList(newList1)
}
return(
  
  <div className='flex items-center flex-col mt-20'>
  <div 
  className={`${state>0?'bg-green-600':'bg-red-600'} w-96 py-3 text-white text-center text-3xl`}>
   Balance: {state}
  </div> 
  <label>Input the amount</label>
  <input min='0' type="number" className='bg-gray-300 w-72 text-xl focus:ring-2 ring-purple-500  py-1 focus:outline-none px-3 rounded-sm' defaultValue={inputAmount} onChange={(e:any)=>setInputAmount(e.target.value)}/>
 <label>Name of the item</label>
 <input onChange={(e:any)=>setItemName(e.target.value)} className='bg-gray-300 w-72 text-xl focus:ring-2 ring-purple-500 py-1 focus:outline-none px-3 rounded-sm' type="text" name="" id=""/>
<div className='text-red-500'>{itemName===''?'Can not left this field empty':null}</div>
<div className='mt-3 flex'>
  <button  className='text-3xl text-white px-4 py-1 bg-red-500 focus:outline-none rounded-sm ' onClick={()=>{itemCount>1?setItemCount(itemCount-1):setItemCount(1)}}>-</button>
  <div className='text-3xl mx-5'>{itemCount}</div>
  <button className='text-3xl text-center text-white px-4  bg-green-500 focus:outline-none rounded-sm ' onClick={()=>setItemCount(itemCount+1)}>+</button>
  </div> 

  <div className='flex mt-5'>
  <button className='bg-green-500 mr-3 py-2 hover:bg-green-700 focus:outline-none shadow-md rounded-sm px-3 text-white' onClick={()=>{handlePush1()}} >Add Income</button>
  <button className='bg-red-500 shadow-md hover:bg-red-700  focus:outline-none rounded-sm py-2 px-3 text-white' onClick={()=>{ handlePush()}}>Add expence</button>
  </div>
  <div className='bg-blue-600 w-80 text-white rounded-sm py-2 mt-5 px-2  text-2xl '>Expense History</div>
  {expenseList
  .sort((a:any,b:any)=>b.createdAt-a.createdAt)
  .map((x)=>
  <div className='bg-gray-300 w-80 my-1 px-2 relative rounded-sm py-2' key={x.id}>
   <div className='flex justify-between'>
     <div> {x.body} </div>
      <div className={`font-bold ${x.type?'text-green-500':'text-red-500'} text-lg` }> {x.amount}</div>
      
      </div>
      <div onClick={()=>handleDelete(x.id)} className='absolute top-1 -right-10 text-lg hover:bg-red-500 py-1 px-2 rounded-sm text-white'>Del</div>
  </div>)}
  </div>
 
)
}

export default App;
