import React from 'react'
import Loadable from 'react-loadable'

export class LoadingComponent extends React.Component {
    render() {
        return (
            <div>
                {/* <SkeletonBlock height="100vh" width="100vw" /> */}
            </div>
        )
    }
}

const PWALoadable = (loader) => Loadable({loader, loading: LoadingComponent})

export default PWALoadable
