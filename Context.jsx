import axios from 'axios'
import React, { Children, createContext, useContext, useEffect, useReducer} from 'react'
let helper=createContext()

const Context = ({children}) => {
    
    let initialValue={
      store:{
            id: Date.now(),
            name: "",
            email:"",
            address: "",
            averageRating: "",
        },
      list:[],
      users:[],
      currentUser: null,
    }

    let reducer=(state,action)=>{
        switch (action.type) {
            case 'setStore':return {...state,list :action.payload}
            break;
            case 'addUser':const alreadyLogged = state.users.some(user => user.email === action.payload.email);
                            if (alreadyLogged) return state;
                            return { ...state, users: [...state.users, action.payload] };
            break;
            case 'loginUser': return { ...state, currentUser: action.payload };
            break;
            case 'rateStore':return {...state,list: state.list.map(store =>store.id === action.payload.storeId ? { ...store,
              averageRating: action.payload.rating}: store)};
            break;
            case 'addStore': return {...state,list: [...state.list, action.payload] };
            break;
            case 'updateStore':return { ...state,list: state.list.map(store =>store.id === action.payload.id ? { ...store, ...action.payload } : store)};
            break;
            case 'deleteStore':return {...state,list: state.list.filter(store => store.id !== action.payload.id)};
            break;
            default:
                break;
        }

    }

    let [state,dispatch]=useReducer(reducer,initialValue)
    console.log(state);
    
    useEffect(()=>{
        axios.get('http://localhost:4000/stores').then((res)=>{
            console.log(res.data);
            dispatch({type :'setStore',payload:res.data})    
        })
    },[])
  return (
    <div>
      <helper.Provider value={{state,dispatch}}>{children}</helper.Provider>
    </div>
  )
}

export let useData=()=>{return useContext(helper)}

export default Context
