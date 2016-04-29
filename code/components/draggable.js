export default function Draggable(Component) {
    return class Draggable extends Component {
        constructor(props, context) {
            super(props, context)

            this.dragMouseDown = this.dragMouseDown.bind(this);
            this.dragMove = this.dragMove.bind(this);
            this.dragMouseUp = this.dragMouseUp.bind(this);
        }

        dragMouseDown(ev) {
            if (ev.button !== 0) return;

            ev.stopPropagation();
            
            document.removeEventListener('mousemove', this.dragMove);
            document.removeEventListener('mouseup', this.dragMouseUp);
            document.addEventListener('mousemove', this.dragMove);
            document.addEventListener('mouseup', this.dragMouseUp);

            if (this.onDragStart) this.onDragStart(ev);

            this.dragLastX = ev.clientX;
            this.dragLastY = ev.clientY;
        }

        dragMove(ev) {
            ev.deltaX = ev.clientX - this.dragLastX;
            ev.deltaY = ev.clientY - this.dragLastY;

            if (this.onDragMove) this.onDragMove(ev);

            this.dragLastX = ev.clientX;
            this.dragLastY = ev.clientY;
        }

        dragMouseUp(ev) {
            document.removeEventListener('mousemove', this.dragMove);
            document.removeEventListener('mouseup', this.dragMouseUp);

            if (this.onDragEnd) this.onDragEnd(ev);

            delete this.dragLastX;
            delete this.dragLastY;
        }
    };
};
