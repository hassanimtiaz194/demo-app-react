import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as yup from "yup";

export function useSocialSignInFormikIntialValues(sections, answer, eventInfo, updatedField, deletedFileField, setDeletedFileField) {
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
    let formikIntialValues = [];
    let formikIntialValues2 = [];
    let temp;
    let temp2;
    const [formikIntialValuesObj, setFormikIntialValuesObj] = useState(null);
    const location = useLocation();

    function fieldAnswer(answer, section) {
        //console.log(answer)
        //console.log(section)
        //let userValue = section.find((sec) => { return sec.sectionId === answer.sectionId })
        let fieldAns = answer.find((ans) => { return ans.sectionId === section.sectionId })
        //console.log(fieldAns?.sectionId === section?.sectionId)
        if ((section?.userValue !== null || section?.userValue !== undefined) &&
            (fieldAns?.answer === null || fieldAns?.answer === undefined) && section?.sectionType !== 'password') {
            return section?.userValue;
        }
        if ((section?.userValue !== null || section?.userValue !== undefined) &&
            (fieldAns?.answer !== null || fieldAns?.answer !== undefined)) {
            return fieldAns?.answer;
        }
        if ((section?.userValue === null || section?.userValue === undefined) &&
            (fieldAns?.answer !== null || fieldAns?.answer !== undefined)) {
            return fieldAns?.answer;
        }
    }



    useEffect(() => {
        if (answer !== null && answer !== undefined) {
            sections.map((section, index) => {
                if (section.sectionType === FIELD_TYPE.TEXTBOX && section.paramMap.Binding !== 'email') {
                    formikIntialValues.push(['textBox' + section.sectionId, fieldAnswer(answer, section)])
                }
                if (section.sectionType === FIELD_TYPE.SELECT) {
                    formikIntialValues.push(['select' + section.sectionId, fieldAnswer(answer, section)])
                }

                if (section.sectionType === FIELD_TYPE.URL) {
                    formikIntialValues.push(['url' + section.sectionId, fieldAnswer(answer, section)])
                }

                if (section.sectionType === FIELD_TYPE.CHECKBOX) {
                    formikIntialValues.push(['checkbox' + section.sectionId, fieldAnswer(answer, section)])
                }

                if (section.sectionType === FIELD_TYPE.RADIO) {
                    formikIntialValues.push(['radio' + section.sectionId, fieldAnswer(answer, section)])
                }

                if (section.sectionType === FIELD_TYPE.TEXTAREA) {
                    formikIntialValues.push(['textArea' + section.sectionId, fieldAnswer(answer, section)])
                }

                if (section.sectionType === FIELD_TYPE.RICH_TEXT) {
                    formikIntialValues.push(['richText' + section.sectionId, fieldAnswer(answer, section)])
                }

                if (section.sectionType === FIELD_TYPE.FILE) {
                    formikIntialValues.push(['file' + section.sectionId, fieldAnswer(answer, section)])
                }

                if (section.sectionType === FIELD_TYPE.VIDEO) {
                    formikIntialValues.push(['video' + section.sectionId, fieldAnswer(answer, section)])
                }

                if (section.sectionType === FIELD_TYPE.PASSWORD) {
                    if (section.paramMap.Binding === 'password') {
                        formikIntialValues.push(['password', fieldAnswer(answer, section)])
                    }
                    if (section.paramMap.Binding === 'confirmPassword') {
                        formikIntialValues.push(['confirmPassword', fieldAnswer(answer, section)])
                    }
                }

                if (section.sectionType === FIELD_TYPE.TEXTBOX && section.paramMap.Binding === 'email') {
                    if (section.paramMap.Binding === 'email') {
                        formikIntialValues.push(['email' /* + section.sectionId */, fieldAnswer(answer, section)])
                    }
                    if (section.paramMap.Binding === 'confirmEmail') {
                        formikIntialValues.push(['confirmEmail' /* + section.sectionId */, fieldAnswer(answer, section)])
                    }

                    //formikIntialValues.push(['email' + section.sectionId, fieldAnswer(answer, section.sectionId)])
                }

                temp = Object.fromEntries(formikIntialValues);

                if (index === sections.length - 1) {
                    setFormikIntialValuesObj(temp)
                }
            })
        }


    }, [sections, answer])

    return {
        formikIntialValuesObj,
    };
}