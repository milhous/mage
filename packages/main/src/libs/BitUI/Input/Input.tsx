import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

import eyeSVG from '@app/assets/images/icons/eye.svg';
import eyeCloseSVG from '@app/assets/images/icons/eyeClose.svg';

import './Input.less';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
    const { type, ...otherProps } = props;
    const [showPassword, setShowPassword] = useState(false);

    let localType = type;
    if (type === 'password' && showPassword) {
        localType = 'text';
    }

    return (
        <div className="bit-input">
            <input type={localType} {...otherProps} />
            {type === 'password' && (
                <span
                    className="eye"
                    onClick={() => {
                        setShowPassword(!showPassword);
                    }}
                >
                    <SVG src={showPassword ? eyeSVG : eyeCloseSVG} />
                </span>
            )}
        </div>
    );
}
