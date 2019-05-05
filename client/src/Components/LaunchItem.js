import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

var styles = {
	color:'red',
	backgroundColor:'black',
    fontWeight:'bold',
    maxwidth: 20
};

const LaunchItem= ({ launch: {flight_number, mission_name, launch_year, launch_date_local, launch_success}}) => (
    <div className="container">
        <div className="card text-white bg-primary mb-3" style={styles}>
            <div className="card-header">
                <h4>Mission:  
                    <span className= {classNames({
                        'text-link': launch_success,
                        'text-danger': !launch_success
                    })}
                    >
                    &nbsp; { mission_name }
                </span>
                </h4>
            </div>
            <div class="card-body">
                <h5 class="card-title">
                    Date: { launch_date_local}
                </h5>
                <p class="card-text">
                    <Link to={`/launch/${flight_number}`} className="btn btn-info">
                        Launch Details
                    </Link>
                </p>
                {/* <div className="col-md-3">
                    <Link to={`/launch/${flight_number}`} className="btn btn-info">
                        Launch Details
                    </Link>
                </div> */}
            </div>
        </div>
    </div>
    
)

export default LaunchItem;