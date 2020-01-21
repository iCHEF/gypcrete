import React from 'react';
import Icon from '@ichef/gypcrete/src/Icon';

import iconSet from '../../../../../configs/fontello.config.json';

function BasicIconsSet() {
    return (
        <>
            {
                iconSet.glyphs.map(({ css: iconName }) => (
                    <Icon
                        type={iconName}
                        spinning={iconName.includes('loading')} />
                ))
            }
        </>
    );
}

export default BasicIconsSet;
