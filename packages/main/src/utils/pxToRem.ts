type Options = {
    unit: number;
    min: number;
};
const defaultOptions = { unit: 75, min: 3 };
const regEx = /(\d+)px/g;

function iterate(prop: string, value, options: Options) {
    const { min, unit } = options;
    if (typeof value !== 'string') {
        return value;
    }

    const match = value.match(regEx);
    if (!match) {
        return value;
    }

    for (const item of match) {
        const item_val = Number(item.slice(0, -2));
        if (min && item_val <= min) {
            continue;
        }
        const new_val = parseFloat((item_val / unit).toFixed(4));
        value = value.replace(item, new_val + 'rem');
    }

    return value;
}

/**
 * Replace all css rules with rem and em to be px
 * Intended to be used when you have no control over the document
 * Takes baseFontSize: number, which is the base font size - TODO: default this to 16
 *
 * @api public
 */
export function jssPxToRem(options = {} as Options) {
    options = { ...defaultOptions, ...options };
    function onProcessStyle(style, rule) {
        if (rule.type !== 'style') {
            return style;
        }

        for (const key in style) {
            style[key] = iterate(key, style[key], options);
        }

        return style;
    }

    function onChangeValue(value, prop) {
        return iterate(prop, value, options);
    }

    return {
        onProcessStyle,
        onChangeValue,
    };
}
