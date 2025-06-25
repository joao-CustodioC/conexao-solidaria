*** Settings ***
Library     SeleniumLibrary

*** Variables ***
${URL}        http://localhost:3000
${BROWSER}    chrome
${EMAIL}      joao@gmail.com
${SENHA}      Dev@123#

*** Test Cases ***
Realização de doação com sucesso
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

    # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    xpath=//button[.//div[contains(text(), "Começar Doação")]]    2s
    Click Element                    xpath=//button[.//div[contains(text(), "Começar Doação")]]

    # Verificar se a página de doação foi carregada
    Wait Until Element Is Visible    id=doar    2s
    Click Element    id=doar

    # Preencher valor e doar
    Input Text    id=valor       50
    Click Element    id=submit_doacao

    Close Browser

Visualizar doações
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

    # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    xpath=//button[.//div[contains(text(), "Começar Doação")]]    2s
    Click Element                    xpath=//button[.//div[contains(text(), "Começar Doação")]]
    Close Browser

Visualizar doações por instituição
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

    # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    xpath=//button[.//div[contains(text(), "Começar Doação")]]    2s
    Click Element                    xpath=//button[.//div[contains(text(), "Começar Doação")]]

    # Verificar se a página de doação foi carregada
    Wait Until Element Is Visible    id=doar    2s
    Click Element    id=doar
    Close Browser
