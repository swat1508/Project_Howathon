import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestApiData } from "../../../store/actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.requestApiData();
  }

  render() {
    return(<div>
      { Object.keys(this.props.data).length !== 0  ? <div>{JSON.stringify( this.props.data )}</div> : <div>Loading...</div> }
    </div>);
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
