import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getStyleByStatus } from '../utils/utils';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Machine extends Component {
  static propTypes = {
    fetchMachine: PropTypes.func.isRequired,
    machines: PropTypes.object,
    styles: PropTypes.object
  };

  componentDidMount() {
    const { fetchMachine } = this.props;
    fetchMachine(this.props.match.params.machineId);
  }

  render() {
    return (
      <div>
        <h2>{this.props.match.params.machineId}</h2>
        {
          this.props.machines && this.props.machines.isFetching ?
            <div>Loading</div>
            :
            <div>
              {
                this.props.machines.data.map(machine => {
                  if (machine.id === this.props.match.params.machineId && machine.events) {
                    return <div key="listGroup">
                      <h5>{'Type: ' + machine.machine_type }</h5>
                      <h6>{'Last maintenance: ' + moment(machine.last_maintenance).fromNow() }</h6>
                      <ListGroup>
                        {
                          machine.events.map((event, i) => {
                            return <ListGroupItem
                              bsStyle={getStyleByStatus(event.status)}
                              key={'event-' + i}
                              header={moment(event.timestamp).fromNow() + ' | ' + event.status}
                            ></ListGroupItem>
                          })
                        }
                      </ListGroup>
                    </div>
                  }
                })
              }
              {
                this.props.machines.data[this.props.match.params.machineId]
              }
            </div>
        }
      </div>
    );
  }
}
