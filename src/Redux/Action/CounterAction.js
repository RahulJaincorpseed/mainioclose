export const Increment = (data) => {
  return {
    type: "INCREMENT",
    payload: data,
  }
}

export const Decrement = (data) => {
  return {
    type: "DECREMENT",
    payload: data,
  }
}


export const UserSetData = (data) => {
  return {
    type: "USERDATA",
    payload: data,
  }
}