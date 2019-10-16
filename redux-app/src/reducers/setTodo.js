const setTodoReducer = (state=[], action) => {
    switch (action.type){
        case 'SET_TODO':
            var list = state.slice()
            list.push(action.payload)
            console.log(state)
            return list

        default:
            return state;
    }
}
export default setTodoReducer;