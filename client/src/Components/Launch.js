import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

var styles = {
    maxwidth: 20
};
const Launches_Query = gql`
    query LaunchesQuery($flight_number: Int) {
        launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_date_local
            launch_success
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;
export class Launch extends Component {
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);
        return (
            <div>
                <Query query={Launches_Query} variables={{flight_number}}>
                    {
                        ({loading, error, data}) => {
                            if(loading) return <h4>Loading...</h4>
                            if(error) console.log("error is",error);
                            console.log(data);

                            const { 
                                    mission_name, 
                                    flight_number, 
                                    launch_year, 
                                    launch_success, 
                                    rocket: {
                                        rocket_id, 
                                        rocket_name, 
                                        rocket_type
                                    }
                                } = data.launch;
                            return (
                                <div className="container">
                                    <div className="card text-white bg-primary mb-3" style={styles}>
                                        <div className="card-header">
                                            <h4 className="text-dark">Mission: {mission_name} </h4>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title"> Launch Details </h4>
                                            <ul class="list-group">
                                                <li className="list-group-item list-group-item-action">
                                                    Flight Number: {flight_number}
                                                </li>
                                                <li className="list-group-item list-group-item-action">
                                                    Launch Year: {launch_year}
                                                </li>
                                                <li className="list-group-item list-group-item-action">
                                                    Launch Successful:{' '}
                                                    <span
                                                    className={classNames({
                                                        'text-success': launch_success,
                                                        'text-danger': !launch_success
                                                    })}
                                                    >
                                                    {launch_success ? 'Yes' : 'No'}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title"> Rocket Details</h4>
                                            <ul className="list-group">
                                                <li className="list-group-item list-group-item-action">
                                                    Rocket ID: {rocket_id}
                                                </li>
                                                <li className="list-group-item list-group-item-action">
                                                    Rocket Name: {rocket_name}
                                                </li>
                                                <li className="list-group-item list-group-item-action">
                                                    Rocket Type: {rocket_type}
                                                </li>
                                            </ul>
                                            <hr />
                                            <Link to="/" className="btn btn-secondary">
                                                Back
                                            </Link> 
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                    
                </Query>
            </div>
        )
    }
}

export default Launch;