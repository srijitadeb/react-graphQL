import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import LaunchItem from './LaunchItem';

const Launches_Query = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_year
            launch_date_local
            launch_success
        }
    }
`;
export class Launches extends Component {
    render() {
        return (
            <div className="container">
            <hr></hr>
                <Query query={Launches_Query}>
                    {
                        ({ loading, error, data}) => {
                            if(loading) return <h4>Loading...</h4>
                            if(error) console.log(error);
                            console.log(data);
                            return <h1>
                                {
                                    data.launches.map(launch => (
                                        <LaunchItem key={launch.flight_number} launch={launch}/>
                                    ))
                                }
                            </h1>
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default Launches;