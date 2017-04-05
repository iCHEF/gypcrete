import React from 'react';
import Tooltip from 'src/Tooltip';

import Icon from 'src/Icon';
import anchored from 'src/mixins/anchored';

function TooltipBox({ children }) {
    return (
        <div style={{ display: 'inline-block', padding: '0 1em' }}>
            {children}
        </div>
    );
}

const AnchoredTooltip = anchored({ defaultPlacement: 'top', padding: 0 })(Tooltip);

class FooBox extends React.PureComponent {
    state = {
        show: false
    }

    componentDidMount() {
        setTimeout(() => this.setState({ show: true }), 500);
    }

    render() {
        return (
            <div style={{ marginTop: 60 }}>
                <span ref={(r) => { this.spanRef = r; }}>
                    <Icon type="printer" />
                </span>

                {this.state.show && <AnchoredTooltip anchor={this.spanRef} />}
            </div>
        );
    }
}

function TooltipDoc() {
    return (
        <div>
            <h2>&lt;Tooltip&gt;</h2>

            <TooltipBox>
                <Tooltip>Tooltip</Tooltip>
            </TooltipBox>

            <TooltipBox>
                <Tooltip placement="bottom">Tooltip</Tooltip>
            </TooltipBox>

            <FooBox />
        </div>
    );
}

export default TooltipDoc;
