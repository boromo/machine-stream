import {Socket} from 'phoenix';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export const REQUEST_MACHINES = 'REQUEST_MACHINES';
export const RECEIVE_MACHINES = 'RECEIVE_MACHINES';
export const RECEIVE_MACHINE = 'RECEIVE_MACHINE';
export const UPDATE_MACHINE = 'UPDATE_MACHINE';

export const receiveMachines = (json) => ({
  type: RECEIVE_MACHINES,
  machines: json.data,
  receivedAt: Date.now()
})

export const requestMachines = () => ({
  type: REQUEST_MACHINES
});

export const updateMachine = (event) => ({
    type: UPDATE_MACHINE,
    event
})

export const receiveMachine = (machine) => ({
  type: RECEIVE_MACHINE,
  machine
})

let listning = false;
const startEventListener = dispatch => {
  // Open Socket connection
  const socket = new Socket('ws://machinestream.herokuapp.com/api/v1/events');
  socket.connect();

  // Join correct channel and log events
  const channel = socket.channel("events", {});
  channel.join();
  channel.on('new', event => dispatch(updateMachine(event)));
  listning = true;
}

const _fetchMachines = () => dispatch => {
  dispatch(requestMachines());
  return fetch('https://machinestream.herokuapp.com/api/v1/machines')
    .then(response => response.json())
    .then(json => {
      if (json && json.data) {
        dispatch(receiveMachines(json));
        if (!listning) {
          startEventListener(dispatch);
        }
      }
    })
}

const _fetchMachine = machineId => dispatch => {
  return fetch('https://machinestream.herokuapp.com/api/v1/machines/' + machineId)
    .then(response => response.json())
    .then(json => {
      if (json && json.data) {
        dispatch(receiveMachine(json));
        if (!listning) {
          startEventListener(dispatch);
        }
      }
    })
}

export const fetchMachines = () => (dispatch, getState) => {
  const state = getState();
  if (!state.machines.data || !state.machines.data.length) {
    return dispatch(_fetchMachines())
  }
  console.log('machines already fetched');
}

export const fetchMachine = machineId => (dispatch) => {
  return dispatch(_fetchMachine(machineId))
}
