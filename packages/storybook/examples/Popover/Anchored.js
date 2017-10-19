import React, { PureComponent } from 'react';

import Button from '@ichef/gypcrete/src/Button';
import AnchoredPopover from '@ichef/gypcrete/src/Popover';
import DemoList from './DemoList';

class AnchoredExample extends PureComponent {
    state ={
        popoverOpen: false
    };

    handlePopoverOpen = () => {
        this.setState({ popoverOpen: true });
    }

    handlePopoverClose = () => {
        this.setState({ popoverOpen: false });
    }

    renderPopover() {
        const { popoverOpen } = this.state;

        if (!popoverOpen || !this.btnRef) {
            return null;
        }

        return (
            <AnchoredPopover
                anchor={this.btnRef}
                onClose={this.handlePopoverClose}>
                <DemoList />
            </AnchoredPopover>
        );
    }

    render() {
        const anchorStyle = {
            display: 'inline-block',
        };

        return (
            <div>
                <span
                    style={anchorStyle}
                    ref={(ref) => { this.btnRef = ref; }}>
                    <Button
                        basic="Open popover"
                        onClick={this.handlePopoverOpen} />
                </span>

                {this.renderPopover()}
            </div>
        );
    }
}

export default AnchoredExample;
