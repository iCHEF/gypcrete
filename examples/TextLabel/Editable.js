import React from 'react';
import EditableTextLabel from 'src/EditableTextLabel';
import DebugBox from '../DebugBox';

function Editable() {
    return (
        <div>
            <DebugBox>
                <EditableTextLabel
                    icon="printer"
                    basic="Kitchen Printer A"
                    aside="00:11:22:33"
                    tag="Online" />
            </DebugBox>

            <DebugBox>
                <EditableTextLabel
                    inEdit
                    icon="printer"
                    basic="Kitchen Printer A"
                    aside="00:11:22:33"
                    tag="Online" />
            </DebugBox>

            <DebugBox>
                <EditableTextLabel
                    status="loading"
                    icon="printer"
                    basic="Kitchen Printer A"
                    aside="00:11:22:33"
                    tag="Online" />
            </DebugBox>
        </div>
    );
}

export default Editable;
