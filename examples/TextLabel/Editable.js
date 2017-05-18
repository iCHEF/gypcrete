import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';

import EditableTextLabel from 'src/EditableTextLabel';
import DebugBox from '../DebugBox';

class EditableExample extends PureComponent {
    state = {
        isEditing: false,
        currentBasic: 'Kitchen Printer',
    };

    handleEditRequest = (event) => {
        this.setState({ isEditing: true });
        action('editRequest')(event);
    }

    handleEditEnd = (event) => {
        if (!event.reset) {
            this.setState({ currentBasic: event.value });
        }

        this.setState({ isEditing: false });
        action('editEnd')(event);
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
                    onEditRequest={this.handleEditRequest}
                    onEditEnd={this.handleEditEnd} />
            </DebugBox>
        );
    }
}

function Editable() {
    return (
        <div>
            <EditableTextLabel
                icon="printer"
                basic="Kitchen Printer"
                aside="00:11:22:33"
                tag="Online"
                onEditRequest={action('editRequest')}
                onEditEnd={action('editEnd')} />

            <p>Interactive example:</p>
            <EditableExample />
        </div>
    );
}

export default Editable;
