import anchored, { ANCHORED_PLACEMENT } from './mixins/anchored';
import renderToLayer from './mixins/renderToLayer';

import Tooltip from './Tooltip';

const AnchoredTooltip = anchored({
    defaultPlacement: ANCHORED_PLACEMENT.TOP,
    padding: 0,
})(Tooltip);

export default renderToLayer(AnchoredTooltip);
