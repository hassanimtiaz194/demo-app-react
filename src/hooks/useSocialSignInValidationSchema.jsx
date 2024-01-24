import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as yup from "yup";

export function useSocialSignInValidationSchema(sections, eventInfo) {
    const FIELD_TYPE = {
        PARAGRAPH: "paragraph",
        TEXTBOX: "textbox",
        SELECT: "select",
        URL: "url",
        CHECKBOX: "checkbox",
        RADIO: "radio",
        TEXTAREA: "textarea",
        RICH_TEXT: "richtext",
        HEADING: "heading",
        FILE: "file",
        VIDEO: "skild-video",
        PASSWORD: "password",
        EMAIL: "email",
        PAGE_BREAK: "pagebreak",
    };
    let formikValidationSchema = [];
    let temp;
    const [entryValidationSchema, setEntryValidationSchema] = useState(null);
    const location = useLocation();
    useEffect(() => {
        sections.map((section, index) => {
            if (section.sectionType === FIELD_TYPE.TEXTBOX && section.paramMap.Binding !== 'email' && section.paramMap.required === "required") {
                formikValidationSchema.push(['textBox' + section.sectionId, section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'This field is required'])
            }
            if (section.sectionType === FIELD_TYPE.SELECT && section.paramMap.required === "required") {
                formikValidationSchema.push(['select' + section.sectionId, section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'Please select one option'])
            }
            if (section.sectionType === FIELD_TYPE.URL && section.paramMap.required === "required") {
                formikValidationSchema.push(['url' + section.sectionId, section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'This url field is required'])
            }
            if (section.sectionType === FIELD_TYPE.CHECKBOX && section.paramMap.required === "required") {
                formikValidationSchema.push(['checkbox' + section.sectionId, section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'This checkbox is required'])
            }
            if (section.sectionType === FIELD_TYPE.RADIO && section.paramMap.required === "required") {
                formikValidationSchema.push(['radio' + section.sectionId, section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'Please select one option'])
            }
            if (section.sectionType === FIELD_TYPE.TEXTAREA && section.paramMap.required === "required") {
                formikValidationSchema.push(['textArea' + section.sectionId, section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'This field is required'])
            }
            if (section.sectionType === FIELD_TYPE.RICH_TEXT && section.paramMap.required === "required") {
                formikValidationSchema.push(['richText' + section.sectionId, section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'this field is required'])
            }
            if (section.sectionType === FIELD_TYPE.FILE && section.paramMap.required === "required") {
                formikValidationSchema.push(['file' + section.sectionId, section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'This field is required'])
            }
            if (section.sectionType === FIELD_TYPE.VIDEO && section.paramMap.required === "required") {
                formikValidationSchema.push(['video' + section.sectionId, section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'This field is required'])
            }
            if (section.sectionType === FIELD_TYPE.PASSWORD && section.paramMap.required === "required") {
                if (section.paramMap.Binding === 'password') {
                    formikValidationSchema.push(['password', section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'Password is required'])
                }
                if (section.paramMap.Binding === 'confirmPassword') {
                    formikValidationSchema.push(['confirmPassword', section.paramMap.labelText !== undefined ? section.paramMap.labelText.trimEnd() + ' is required' : 'Confirm Password is required'])
                }
            }

            if (section.sectionType === FIELD_TYPE.TEXTBOX && section.paramMap.Binding === 'email' && section.paramMap.required === "required") {
                if (section.paramMap.Binding === 'email') {
                    formikValidationSchema.push(['email', section.paramMap.labelText !== undefined ? section.paramMap.labelText + ' is required' : 'Email is required'])
                }
                if (section.paramMap.Binding === 'confirmEmail') {
                    formikValidationSchema.push(['confirmEmail', section.paramMap.labelText !== undefined ? section.paramMap.labelText + ' is required' : 'Confirm Email is required'])
                }
            }

            temp = Object.fromEntries(formikValidationSchema);
            setEntryValidationSchema(Object.entries(temp).map((e) => ({ [e[0]]: e[1] })));
        })
    }, [sections, eventInfo]);

    return {
        formikValidationSchema,
        entryValidationSchema
    };
}