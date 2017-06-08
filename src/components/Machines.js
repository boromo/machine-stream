import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyleByStatus } from '../utils/utils';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Machines extends Component {
  static propTypes = {
    fetchMachines: PropTypes.func.isRequired,
    machines: PropTypes.object,
    styles: PropTypes.object
  };

  componentDidMount() {
    const { fetchMachines } = this.props;
    fetchMachines();
  }

  render() {
    return (
      <div>
        <h2>Machine Stream</h2>
        {
          this.props.machines && this.props.machines.isFetching ?
            <div>Loading</div>
            :
            <ListGroup>
              {
                this.props.machines.data.map(machine => {
                  return <ListGroupItem
                      bsStyle={getStyleByStatus(machine.status)}
                      key={machine.id}
                      header={machine.id + ' | ' + machine.status}
                    >
                      <Link to={'/machine/' + machine.id}>details</Link>
                    </ListGroupItem>
                })
              }
            </ListGroup>
        }
      </div>
    );
  }
}
