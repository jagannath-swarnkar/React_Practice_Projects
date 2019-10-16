export const increment = (nr) =>{
    if(nr !== undefined){
        return {
            type: 'INCREMENT',
            payload: nr
        }
    }
    else{
        return {
            type: 'INCREMENT',
            payload: 1
        }
    }
}

export const decrement = (nr) =>{
    if(nr !== undefined){
        return {
            type: 'DECREMENT',
            payload: nr
        }
    }
    else{
        return {
            type: 'DECREMENT',
            payload: 1
        }
    }
}

export const setTodo = (itemList) =>{
    return {
        type: 'SET_TODO',
        payload: itemList
    }
}