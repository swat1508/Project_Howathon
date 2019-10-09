import React from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import PropTypes from 'prop-types'

import {initializeHome} from './actions'
import * as globalSelectors from '../../selectors'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.pageType = 'home'
    }

    componentDidMount() {
        const {initializeHome} = this.props
        initializeHome()
    }

    render() {
        return (
            <div className="t-home">
                <h1>Welcome to Eunoia's ChatBot!</h1>
                <input type="button">CLICK TO CHAT</input>
            </div>
        )
    }
}

Home.propTypes = {
    initializeHome: PropTypes.func,
    uiState: PropTypes.object
}

// export {Home as UnconnectedHome}

const mapStateToProps = createPropsSelector({
    uiState: globalSelectors.getHome
})

const mapDispatchToProps = {
    initializeHome: initializeHome
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
