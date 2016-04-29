import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import WidgetsContainer from '../components/widgets-container'
import * as WidgetActions from '../actions/index'

class App extends Component {
  render() {
    const { scroller, widgets, actions } = this.props;
    return (
      <div style={{width: '100vw',  height: '100vh', overflow: 'hidden', backgroundColor: '#888'}}>
          <WidgetsContainer scroller={scroller} widgets={widgets} actions={actions} />
      </div>
    )
  }
}

App.propTypes = {
  scroller: ImmutablePropTypes.record.isRequired,
  widgets: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    widgets: state.widgets,
    scroller: state.scroller
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WidgetActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
