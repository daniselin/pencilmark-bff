import isEmpty from "lodash/isEmpty";
import forOwn from "lodash/forOwn";
import endsWith from "lodash/endsWith";
import forEach from "lodash/forEach";

export const flattenForm = (toFlatten) => {
    let form = {};
    forEach(toFlatten, (value, key) => {
        if (typeof value === 'object') {
            flattenObject(key, value, form);
        } else {
            form[key] = value;
        }
    });
    return form;
};

const flattenObject = (key, value, form) => {
    if (!isEmpty(value) || value !== undefined) {
        if (Array.isArray(value)) {
            forEach(value, (arrayValue, index) => {
                forOwn(arrayValue, (v, k) => {
                    const newKey = key + "[" + index + "]." + k;
                    flattenObject(newKey, v, form);
                });
            });
        } else {
            if (typeof value === 'object') {
                forOwn(value, (v, k) => {
                    const newKey = key + "." + k;
                    flattenObject(newKey, v, form);
                });
            } else {
                form[key] = value;
            }
        }
    }
    return form;
};

export const inflateForm = (toInflate) => {
    let keepGoing = true;
    let atRoot = false;
    let form = {...toInflate};
    let iterations = 0;

    while (keepGoing && iterations < 10) {
        iterations++;
        let cloned = {};
        let maxDepth = getMaxDepth(form);
        if (maxDepth === 1) {
            if (atRoot) {
                break;
            } else {
                atRoot = true;
            }
            }
        forOwn(form, function (value, key) {
            const parts = key.split(".");
            if (maxDepth === parts.length) {
                const lastNode = parts.pop();
                let property = parts.join(".") || lastNode;
                if (endsWith(lastNode, "]")) {
                    const strippedKey = key.substring(0, key.lastIndexOf("["));
                    const array = cloned[strippedKey] || [];
                    array.push(value);
                    cloned[strippedKey] = array;
                } else {
                    let obj = cloned[property] || {};
                    if (property === lastNode) {
                        obj = value;
                    } else {
                        obj[lastNode] = value;
                    }
                    cloned[property] = obj;
                }
            } else {
                cloned[key] = value;
            }
        });

        form = {...cloned}
    }
    return form;
};

const getMaxDepth = (form) => {
    let maxDepth = 1;
    forOwn(form, function (value, key) {
        let parts = key.split(".");
        maxDepth = (maxDepth >= parts.length) ? maxDepth : parts.length;
    });
    return maxDepth;
}

