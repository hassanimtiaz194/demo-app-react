import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as yup from "yup";

export function usePasswordsValidition(passwordformik, advanceSecurityEnabled, fieldType) {
    //const [passInputTarget, setPassInputTarget] = useState(null);
    //Password states
    let password = null;
    let confirmPassword = null;
    const [minCharacters, setMinCharacters] = useState(true);
    const [containDigit, setContainDigit] = useState(true);
    const [containUpperCase, setContainUpperCase] = useState(true);
    const [containSpecialCharacter, setContainSpecialCharacter] = useState(true);
    //Confirm Password states    
    const [minCharacters2, setMinCharacters2] = useState(true);
    const [containDigit2, setContainDigit2] = useState(true);
    const [containUpperCase2, setContainUpperCase2] = useState(true);
    const [containSpecialCharacter2, setContainSpecialCharacter2] = useState(true);

    const [isError, setIsError] = useState(false);

    const [passwordsMatch, setPasswordMatch] = useState(true);
    const [isPasswordsMatch, setIsPasswordMatch] = useState(false);
    const location = useLocation();

    const minSecuritySchema = yup.object({
        passwordMinCharacters: yup.string().min(6),
        confirmPasswordMinCharacters: yup.string().min(6),
    });

    const maxSecuritySchema = yup.object({
        passwordMinCharacters: yup.string().min(8),
        passwordContainDigit: yup.string().matches(/[0-9]/),
        passwordContainUpperCase: yup.string().matches(/[A-Z]/),
        passwordContainSpecialCharacter: yup.string().matches(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/),
        confirmPasswordMinCharacters: yup.string().min(8),
        confirmPasswordContainDigit: yup.string().matches(/[0-9]/),
        confirmPasswordContainUpperCase: yup.string().matches(/[A-Z]/),
        confirmPasswordContainSpecialCharacter: yup.string().matches(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/),

    });

    useEffect(() => {
        if (location.pathname !== '/applications' && location.pathname !== '/register' && location.pathname !== '/completeRegistration' && location.pathname !=='/registerTeamMember' && location.pathname !== '/home') {
            if (passwordformik && passwordformik !== undefined) {
                // minimun Security
                if (advanceSecurityEnabled === false) {
                    //minimum characters
                    minSecuritySchema.isValid({ passwordMinCharacters: location.pathname === '/resetPassword' ? passwordformik.values.password : passwordformik.values.newPassword }).then((value) => {
                        if (value === true) { setMinCharacters(false) }
                        else { setMinCharacters(true) }
                    })
                    minSecuritySchema.isValid({ confirmPasswordMinCharacters: passwordformik.values.confirmPassword }).then((value) => {
                        if (value === true) { setMinCharacters2(false) }
                        else { setMinCharacters2(true) }
                    })
                    //password Match
                    if (location.pathname === '/resetPassword') {
                        if (passwordformik.values.password === passwordformik.values.confirmPassword && passwordformik.values.confirmPassword !== '') {
                            setPasswordMatch(false);
                        }
                        else {
                            setPasswordMatch(true);
                        }
                    } else {
                        if (passwordformik.values.newPassword === passwordformik.values.confirmPassword && passwordformik.values.confirmPassword !== '') {
                            setPasswordMatch(false);
                        }
                        else {
                            setPasswordMatch(true);
                        }
                    }

                }
                // max security
                if (advanceSecurityEnabled === true) {

                    //minimum characters
                    maxSecuritySchema.isValid({ passwordMinCharacters: location.pathname === '/resetPassword' ? passwordformik.values.password : passwordformik.values.newPassword }).then((value) => {
                        if (value === true) { setMinCharacters(false) }
                        else { setMinCharacters(true) }
                    })
                    maxSecuritySchema.isValid({ confirmPasswordMinCharacters: passwordformik.values.confirmPassword }).then((value) => {
                        if (value === true) { setMinCharacters2(false) }
                        else { setMinCharacters2(true) }
                    })


                    //one digit
                    maxSecuritySchema.isValid({ passwordContainDigit: location.pathname === '/resetPassword' ? passwordformik.values.password : passwordformik.values.newPassword }).then((value) => {
                        if (value === true) { setContainDigit(false) }
                        else { setContainDigit(true) }
                    })
                    maxSecuritySchema.isValid({ confirmPasswordContainDigit: passwordformik.values.confirmPassword }).then((value) => {
                        if (value === true) { setContainDigit2(false) }
                        else { setContainDigit2(true) }
                    })

                    //one Alphabet
                    maxSecuritySchema.isValid({ passwordContainUpperCase: location.pathname === '/resetPassword' ? passwordformik.values.password : passwordformik.values.newPassword }).then((value) => {
                        if (value === true) { setContainUpperCase(false) }
                        else { setContainUpperCase(true) }
                    })
                    maxSecuritySchema.isValid({ confirmPasswordContainUpperCase: passwordformik.values.confirmPassword }).then((value) => {
                        if (value === true) { setContainUpperCase2(false) }
                        else { setContainUpperCase2(true) }
                    })

                    //Special Character
                    maxSecuritySchema.isValid({ passwordContainSpecialCharacter: location.pathname === '/resetPassword' ? passwordformik.values.password : passwordformik.values.newPassword }).then((value) => {
                        if (value === true) { setContainSpecialCharacter(false) }
                        else { setContainSpecialCharacter(true) }
                    })
                    maxSecuritySchema.isValid({ confirmPasswordContainSpecialCharacter: passwordformik.values.confirmPassword }).then((value) => {
                        if (value === true) { setContainSpecialCharacter2(false) }
                        else { setContainSpecialCharacter2(true) }
                    })
                    //password Match
                    if (location.pathname === '/resetPassword') {
                        if (passwordformik.values.password === passwordformik.values.confirmPassword && passwordformik.values.confirmPassword !== '') {
                            setPasswordMatch(false);
                        }
                        else {
                            setPasswordMatch(true);
                        }
                    } else {
                        if (passwordformik.values.newPassword === passwordformik.values.confirmPassword && passwordformik.values.confirmPassword !== '') {
                            setPasswordMatch(false);
                        }
                        else {
                            setPasswordMatch(true);
                        }
                    }
                }
            }
        }
        else {
            if (fieldType === 'password') {
                if (advanceSecurityEnabled === false) {
                    //minimum character
                    minSecuritySchema.isValid({ passwordMinCharacters: passwordformik }).then((value) => {
                        if (value === true) { setMinCharacters(false) }
                        else { setMinCharacters(true) }
                    })
                    if (password === confirmPassword /* && password !== null && password !== '' */) {
                        setIsPasswordMatch(true);
                    } else {
                        setIsPasswordMatch(false);
                    }

                    if (minCharacters) {
                        setIsError(true);
                    } else {
                        setIsError(false)
                    }
                }

                if (advanceSecurityEnabled === true) {
                    //minimum character
                    maxSecuritySchema.isValid({ passwordMinCharacters: passwordformik }).then((value) => {
                        if (value === true) { setMinCharacters(false) }
                        else { setMinCharacters(true) }
                    })
                    //one digit
                    maxSecuritySchema.isValid({ passwordContainDigit: passwordformik }).then((value) => {
                        if (value === true) { setContainDigit(false) }
                        else { setContainDigit(true) }
                    })
                    //upper case
                    maxSecuritySchema.isValid({ passwordContainUpperCase: passwordformik }).then((value) => {
                        if (value === true) { setContainUpperCase(false) }
                        else { setContainUpperCase(true) }
                    })
                    //special character
                    maxSecuritySchema.isValid({ passwordContainSpecialCharacter: passwordformik }).then((value) => {
                        if (value === true) { setContainSpecialCharacter(false) }
                        else { setContainSpecialCharacter(true) }
                    })
                    if (minCharacters && containDigit && containUpperCase && containSpecialCharacter) {
                        setIsError(true);
                    } else {
                        setIsError(false)
                    }

                }
            }
        }


    }, [passwordformik, isPasswordsMatch, password, confirmPassword, isError, minCharacters, minCharacters2, containDigit, containDigit2, containUpperCase, containUpperCase2, containSpecialCharacter, containSpecialCharacter2, passwordsMatch]);

    return {
        minCharacters,
        minCharacters2,
        containDigit,
        containDigit2,
        containUpperCase,
        containUpperCase2,
        containSpecialCharacter,
        containSpecialCharacter2,
        passwordsMatch,
        isError
    };
}