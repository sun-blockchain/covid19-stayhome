import React, { Component } from 'react';
import Profile from '../Profile';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import store from 'store';
import { BounceLoader } from "react-spinners";
class Home extends Component {
    componentDidMount() {
        store.dispatch(actions.getAddressFromMetaMask());
    }
    render() {
        return (
            <div>
                {this.props.space && (
                    <Profile
                        box={this.state.box}
                        space={this.state.space}
                        account={this.state.account}
                        threeBoxProfile={this.state.threeBoxProfile}
                    />
                )}
                {!this.props.space && (
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
        box: state.threebox.box,
        space: state.threebox.space,
        account: state.threebox.account,
        threeBoxProfile: state.threebox.threeBoxProfile
    };
};

export default compose(connect(mapStatetoProps))(Home);
