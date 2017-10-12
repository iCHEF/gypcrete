import React, { PureComponent } from 'react';
import { action, decorateAction } from '@storybook/addon-actions';

import EditableTextLabel from '@ichef/gypcrete/src/EditableTextLabel';
import DebugBox from '../DebugBox';

/**
 * The official `action` shipped with React Storybook crashes when
 * your payload contains an DOM node.
 *
 * This decorated action stripes DOM nodes, only shows their names.
 */
const cleanAction = decorateAction([
    ([payload]) => {
        const cleanPayload = {
            ...payload,
            event: `[${payload.event.constructor.name}]`,
        };
        return [cleanPayload];
    }
]);

class ControlledExample extends PureComponent {
    state = {
        isEditing: false,
        status: null,
        currentBasic: 'Kitchen Printer',
    };

    handleDblClick = (event) => {
        this.setState({ isEditing: true });
        action('dblClick')(event);
    }

    handleEditEnd = (payload) => {
        // When value isn't `null`, it's not a cancelling action from ESC key
        const hasValue = payload.value !== null;

        if (hasValue) {
            this.setState({ currentBasic: payload.value });
            setTimeout(() => this.setState({ status: 'success' }), 600);
        }

        this.setState({
            isEditing: false,
            status: hasValue ? 'loading' : null,
        });
        cleanAction('editEnd')(payload);
    }

    render() {
        return (
            <DebugBox>
                <EditableTextLabel
                    inEdit={this.state.isEditing}
                    icon="printer"
                    basic={this.state.currentBasic}
                    aside="00:11:22:33"
                    tag="Online"
                    onDblClick={this.handleDblClick}
                    onEditEnd={this.handleEditEnd}
                    status={this.state.status} />
            </DebugBox>
        );
    }
}

function Editable() {
    return (
        <div>
            <p>Uncontrolled (self-controlled) editable label:</p>
            <EditableTextLabel
                icon="printer"
                basic="Kitchen Printer"
                aside="00:11:22:33"
                tag="Online"
                onDblClick={action('dblClick')}
                onEditEnd={cleanAction('editEnd')} />

            <p>Controlled editable label:</p>
            <ControlledExample />
        </div>
    );
}

export default Editable;
