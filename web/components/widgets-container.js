import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';
import Draggable from './draggable';
import Widget from './widget';

class WidgetsContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onClick = this.onClick.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.x = 0;
    this.y = 0;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, true);
  }

  componentWillUmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const { scroller, widgets, actions } = this.props;

    return (
      <div style={this.getStyles(scroller)} onDoubleClick={this.onDoubleClick} onClick={this.onClick} onMouseDown={this.dragMouseDown} onDrag={this.dragMouseDown}>
        {widgets.valueSeq().toArray().map((widget) => <Widget key={widget.id} widget={widget} {...actions} />)}
      </div>
    )
  }

  getStyles(scroller) {
      return {
          overflow: 'hidden',
          width: '9000px',
          height: '6000px',
          display: 'block',
          position: 'relative',
          transition: 'height .2s',
          backgroundColor: '#efefef',
          left: scroller.x,
          top: scroller.y
      };
  }

  onKeyDown(e) {
    if(e.keyCode !== 46) // delete
      return;

    this.props.actions.widgetDeleteSelected();
  }

  onDoubleClick(e) {
    this.props.actions.widgetAdd(e.clientX - this.props.scroller.x, e.clientY - this.props.scroller.y);
  }

  onClick() {
    this.props.actions.unselectAll();
  }

  onDragMove(ev) {
    this.props.actions.scroll(ev.deltaX, ev.deltaY);
  }
}

WidgetsContainer.propTypes = {
  scroller: ImmutablePropTypes.record.isRequired,
  widgets: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object.isRequired
}

export default Draggable(WidgetsContainer);
