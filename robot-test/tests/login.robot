*** Settings ***
Library     SeleniumLibrary
Library     String

*** Variables ***
${URL}       http://localhost:3000
${BROWSER}   chrome

*** Test Cases ***
Login com usuário existente
    Open Browser    ${URL}    ${BROWSER}
    Input Text       id=email   joao@gmail.com
    Input Text       id=password   Dev@123#
    Click Element    id=login-button
    Close Browser