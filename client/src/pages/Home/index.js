import React, { Component } from 'react';
import Profile from '../Profile';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import store from '../../store';
import { BounceLoader } from "react-spinners";
class Home extends Component {
    componentDidMount() {
        store.dispatch(actions.getAddressFromMetaMask());
    }
    render() {
        return (
            <div>
                {this.props.threebox.space && (
                    <Profile
                        box={this.props.threebox.box}
                        space={this.props.threebox.space}
                        account={this.props.threebox.account}
                        threeBoxProfile={this.props.threebox.threeBoxProfile}
                    />
                )}
                {!this.props.threebox.space && (
                    <div style={{ width: "60px", margin: "auto" }}>
                        <BounceLoader color={"blue"} />
                    </div>
                )}
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        threebox: state.threebox

    };
};

export default compose(connect(mapStatetoProps))(Home);
