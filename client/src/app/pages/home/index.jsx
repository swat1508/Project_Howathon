import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import PropTypes from 'prop-types'
import './base.scss'
import {initializeHome} from './actions'
import * as globalSelectors from '../../selectors'
import ChatView from '../../components/chat-view/chat-view.component'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.pageType = 'home'
    }

    // componentDidMount() {
    //     const {initializeHomeDispatcher} = this.props
    //     // initializeHomeDispatcher()
    // }

    render() {
        return (
            <div className="t-home">
                <div className="hd_container"><p className="cb_header">Welcome to Eunoia's ChatBot!</p></div>
                {/* <input type="button" value="CLICK TO CHAT" /> */}
                < ChatView/>
            </div>
        )
    }
}

Home.propTypes = {
    initializeHomeDispatcher: PropTypes.func,
    uiState: PropTypes.object
}

// export {Home as UnconnectedHome}

const mapStateToProps = createPropsSelector({
    uiState: globalSelectors.getHome
})

const mapDispatchToProps = (dispatch) => ({
    initializeHomeDispatcher: () => dispatch(initializeHome())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
