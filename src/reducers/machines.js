import { REQUEST_MACHINES, RECEIVE_MACHINES, RECEIVE_MACHINE, UPDATE_MACHINE } from '../actions/machines'

const _machines = (state, action) => {
  switch (action.type) {
    case REQUEST_MACHINES:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_MACHINES:
      return {
        ...state,
        isFetching: false,
        data: action.machines,
        lastUpdated: action.receivedAt
      }
    case UPDATE_MACHINE:
      return {
        ...state,
        data: state.data.map(machine => machine.id === action.event.machine_id ?
          { ...machine, status: action.event.status } :
            machine
        )
      }
    case RECEIVE_MACHINE:
      return {
        ...state,
        data: state.data.map(machine => machine.id === action.machine.data.id ?
          { ...machine, ...action.machine.data } :
            machine
        )
      }
    default:
      return state
  }
}

const machines = (state = {
  isFetching: false,
  data: []
}, action) => {
  switch (action.type) {
    case REQUEST_MACHINES:
    case RECEIVE_MACHINES:
    case RECEIVE_MACHINE:
    case UPDATE_MACHINE:
      return {
        ...state,
        ..._machines(state, action)
      }
    default:
      return state
  }
}

export default machines