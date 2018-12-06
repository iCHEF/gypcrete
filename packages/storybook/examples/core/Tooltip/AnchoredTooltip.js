import React, { PureComponent } from 'react';

import AnchoredTooltip from '@ichef/gypcrete/src/Tooltip';

class AnchoredTooltipExample extends PureComponent {
    state ={
        shouldShowTooltip: false
    };

    handleTooltipShow = () => {
        this.setState({ shouldShowTooltip: true });
    }

    handleTooltipHide = () => {
        this.setState({ shouldShowTooltip: false });
    }

    render() {
        const { shouldShowTooltip } = this.state;
        const anchoredStyle = {
            textDecoration: 'underline',
        };

        return (
            <div>
                <span
                    ref={(ref) => { this.textRef = ref; }}
                    onMouseEnter={this.handleTooltipShow}
                    onMouseLeave={this.handleTooltipHide}
                    style={anchoredStyle}>
                    Hover on me
                </span>

                {(shouldShowTooltip && this.textRef)
                    && (
                        <AnchoredTooltip anchor={this.textRef}>
                            Yo, I am a tooltip.
                        </AnchoredTooltip>
                    )}
            </div>
        );
    }
}

export default AnchoredTooltipExample;
