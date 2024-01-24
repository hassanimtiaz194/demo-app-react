import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as yup from "yup";

export function useEntryFormFomikIntialsValues(sections, answer, eventInfo, updatedField, deletedFileField, setDeletedFileField) {
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
    const [formikIntialValuesObj2, setFormikIntialValuesObj2] = useState(null);
    const location = useLocation();

    function fieldAnswer(answer, section) {
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
        if (location.pathname !== '/register' && location.pathname !== '/completeRegistration' && location.pathname !== '/registerTeamMember') {
            sections.map((section, index) => {
                if (section.type === FIELD_TYPE.TEXTBOX && section.type !== FIELD_TYPE.EMAIL) {
                    formikIntialValues.push(['textBox' + section.sectionId, answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                }
                if (section.type === FIELD_TYPE.SELECT) {
                    formikIntialValues.push(['select' + section.sectionId, answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                }

                if (section.type === FIELD_TYPE.URL) {
                    formikIntialValues.push(['url' + section.sectionId, answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                }

                if (section.type === FIELD_TYPE.CHECKBOX) {
                    formikIntialValues.push(['checkbox' + section.sectionId, answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                }

                if (section.type === FIELD_TYPE.RADIO) {
                    formikIntialValues.push(['radio' + section.sectionId, answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                }

                if (section.type === FIELD_TYPE.TEXTAREA) {
                    formikIntialValues.push(['textArea' + section.sectionId, answer[index]?.answer === undefined ? '' : answer[index].answer])
                }

                if (section.type === FIELD_TYPE.FILE) {
                    formikIntialValues.push(['file' + section.sectionId, answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                }

                if (section.type === FIELD_TYPE.VIDEO) {
                    formikIntialValues.push(['video' + section.sectionId, answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                }

                if (section.type === FIELD_TYPE.PASSWORD) {
                    //if (eventInfo.advanceSecurityEnabled === false) {
                    if (section.paramMap.binding === 'password') {
                        formikIntialValues.push(['password', answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                    }
                    if (section.paramMap.binding === 'confirmPassword') {
                        formikIntialValues.push(['confirmPassword', answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                    }
                }

                if (section.type === FIELD_TYPE.TEXTBOX && section.type === FIELD_TYPE.EMAIL) {
                    if (section.paramMap.binding === 'email') {
                        formikIntialValues.push(['email' /* + section.sectionId */, answer[index].answer === undefined ? '' : answer[index]?.answer])
                    }
                    if (section.paramMap.binding === 'confirmEmail') {
                        formikIntialValues.push(['confirmEmail' /* + section.sectionId */, answer[index].answer === undefined ? '' : answer[index]?.answer])
                    }
                }

                temp = Object.fromEntries(formikIntialValues);

                if (index === sections.length - 1) {
                    setFormikIntialValuesObj(temp)
                }
            })
        }
    }, [sections/* , answer */]);

    // // Application page update all fields except file field, rich text and video
    useEffect(() => {
        if (location.pathname !== '/register' && location.pathname !== '/completeRegistration' && location.pathname !== '/registerTeamMember') {
            if (updatedField !== null) {
                if (updatedField.type !== FIELD_TYPE.VIDEO && updatedField.type !== FIELD_TYPE.FILE && updatedField.type !== FIELD_TYPE.RICH_TEXT) {
                    Object.keys(formikIntialValuesObj).forEach((key) => {
                        if (key.match(updatedField.sectionId)) {
                            //formikIntialValuesObj[key] = answer;
                            setFormikIntialValuesObj({
                                ...formikIntialValuesObj,
                                [key]: updatedField.answer
                            });
                        }
                    })
                }
            }
        }
    }, [updatedField])

    // Application page video and filefield
    useEffect(() => {
        if (location.pathname !== '/register' && location.pathname !== '/completeRegistration' && location.pathname !== '/registerTeamMember') {
            if (updatedField !== null) {
                //console.log(updatedField)
                if (updatedField.type === FIELD_TYPE.VIDEO || updatedField.type === FIELD_TYPE.FILE) {
                    const filterAnswer = answer.find((value) => {
                        if (value.sectionId === updatedField.sectionId && value.answer !== undefined) {
                            return value;
                        }
                    })
                    if (filterAnswer !== undefined) {
                        // console.log(filterAnswer?.sectionId)
                        Object.keys(formikIntialValuesObj).forEach((key) => {
                            if (key.match(filterAnswer.sectionId)) {
                                //formikIntialValuesObj[key] = answer;
                                setFormikIntialValuesObj({
                                    ...formikIntialValuesObj,
                                    [key]: filterAnswer.answer
                                });
                            }
                        })

                    }
                }
            }
        }

    }, [updatedField, answer])

    // Application page Rich Text 
    useEffect(() => {
        if (location.pathname !== '/register' && location.pathname !== '/completeRegistration' && location.pathname !== '/registerTeamMember') {
            sections.map((section, index) => {
                if (section.type === FIELD_TYPE.RICH_TEXT) {
                    formikIntialValues2.push(['richText' + section.sectionId, answer[index]?.answer === undefined ? '' : answer[index]?.answer])
                }
                temp2 = Object.fromEntries(formikIntialValues2);

                if (index === sections.length - 1) {
                    setFormikIntialValuesObj2(temp2)
                }
            })
        }
    }, [sections, answer])
    // Application page delete
    useEffect(() => {
        if (location.pathname !== '/register' && location.pathname !== '/completeRegistration' && location.pathname !== '/registerTeamMember') {
            if (deletedFileField !== null) {
                //console.log(deletedFileField)
                Object.keys(formikIntialValuesObj).forEach((key) => {
                    if (key.match(deletedFileField.sectionId)) {
                        //formikIntialValuesObj[key] = answer;
                        setFormikIntialValuesObj({
                            ...formikIntialValuesObj,
                            [key]: ''
                        });
                    }
                })
            }
        }
    }, [deletedFileField])

    useEffect(() => {
        if (location.pathname === '/register' || location.pathname === '/completeRegistration' || location.pathname === '/registerTeamMember') {
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

        }
    }, [sections, answer])

    return {
        formikIntialValuesObj,
        formikIntialValuesObj2,
        setFormikIntialValuesObj
    };
}