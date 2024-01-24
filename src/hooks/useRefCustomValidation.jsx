import { useState, useEffect } from 'react';

export function useRefCustomValidation(field, isRequired, inputRef, answer, setIsDynamicRichTextboxRequired) {
    const [refRichTextBoxValidation, setRichTextBoxValidation] = useState(false);
    const [refFileFieldValidation, setRefFileFieldValidation] = useState(false);

    useEffect(() => {
        if (isRequired && inputRef.current !== null && field.type === 'richtext') {
            inputRef.current.el.addEventListener('invalid', (e) => {
                setRichTextBoxValidation(true);
                setIsDynamicRichTextboxRequired(true);
            });
        }
        if (inputRef.current !== null && (field.type === 'file' || field.type === 'skild-video')) {
            inputRef.current.parentElement.removeAttribute("role");
            if (isRequired) {
                inputRef.current.addEventListener('invalid', (e) => {
                    setRefFileFieldValidation(true);
                })
            }
        }
    }, [refRichTextBoxValidation, refFileFieldValidation]);

    return {
        refRichTextBoxValidation,
        refFileFieldValidation,
        setRichTextBoxValidation,
        setRefFileFieldValidation
    };
}