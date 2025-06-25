*** Settings ***
Library     SeleniumLibrary
Library     String

*** Variables ***
${URL}       http://localhost:3000         # Altere para a porta correta se necessário
${BROWSER}   chrome

*** Test Cases ***
Cadastro de novo usuário com sucesso
    ${id_aleatorio}=    Generate Random String    5
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Click Element    xpath=//a[text()="Criar conta gratuita"]
    Input Text       id=name        João Teste
    Input Text       id=email       joao${id_aleatorio}@exemplo.com
    Input Text       id=password       Senha123!
    Click Button     xpath=//button[text()="Criar conta gratuita"]
    Close Browser

