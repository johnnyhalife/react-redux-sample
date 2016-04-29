import React, {
    Component,
    PropTypes
} from 'react'
import _ from 'lodash'

import Draggable from './draggable.js';

class Widget extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
      const { widget } = this.props

      return (
        <div style={this.getStyle(widget)} onMouseDown={this.dragMouseDown} onDrag={this.dragMouseDown} />
      )
    }

    getStyle(widget) {
        return {
            backgroundColor: '#ffee00',
            border: widget.selected ? '1px solid blue' : '0',

            width: widget.width,
            height: widget.height,

            position: 'absolute',
            left: widget.x,
            top: widget.y
        }
    }

    onDragStart() {
        this.props.unselectAll(this.props.widget.id);
        this.props.widgetSetMove(this.props.widget.id, false);
    }

    onDragEnd() {
      const widget = this.props.widget;

      setTimeout(() => {
          this.props.widgetSetMove(this.props.widget.id, false);
      }, 200);

      this.props.widgetDragEnd(widget.id);
    }

    onDragMove(ev) {
        const widget = this.props.widget;
        this.props.widgetSetMove(this.props.widget.id, true);
        this.props.widgetMove(widget.id, widget.x + ev.deltaX, widget.y + ev.deltaY);
    }
}

Widget.propTypes = {
    widget: PropTypes.object.isRequired
}

export default Draggable(Widget)
