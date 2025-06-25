*** Settings ***
Library     SeleniumLibrary

*** Variables ***
${URL}        http://localhost:3000
${BROWSER}    chrome
${EMAIL}      joao@gmail.com
${SENHA}      Dev@123#

*** Test Cases ***
Inscrever-se para um serviço
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

    # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    xpath=//button[.//h3[contains(text(), "Voluntário Express")]]    2s
    Click Element                    xpath=//button[.//h3[contains(text(), "Voluntário Express")]]

    # Verificar se a página de doação foi carregada
    Wait Until Element Is Visible    id=participar    2s
    Click Element    id=participar

    # Selecionar o primeiro serviço disponível no select
    Wait Until Element Is Visible    id=servico    5s
    Select From List By Index        id=servico    1
    Click Button    xpath=//button[.//span[contains(text(), "Inscrever-se")]]

    Close Browser

Visualizar Instituição disponíveis para se inscrever
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

    # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    xpath=//button[.//h3[contains(text(), "Voluntário Express")]]    2s
    Click Element                    xpath=//button[.//h3[contains(text(), "Voluntário Express")]]

    Close Browser

Visualizar inscrições por Instituição
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

    # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    xpath=//button[.//h3[contains(text(), "Voluntário Express")]]    2s
    Click Element                    xpath=//button[.//h3[contains(text(), "Voluntário Express")]]

    # Verificar se a página de doação foi carregada
    Wait Until Element Is Visible    id=participar    2s
    Click Element    id=participar

    Close Browser