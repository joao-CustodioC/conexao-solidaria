*** Settings ***
Library     SeleniumLibrary
Library    String

*** Variables ***
${URL}        http://localhost:3000
${BROWSER}    chrome
${EMAIL}      joao@gmail.com
${SENHA}      Dev@123#

*** Test Cases ***
Visualizar Serviços
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

    # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    id=instituicoes-button    2s
    Click Element                    id=instituicoes-button

    Close Browser

Cadastrar Instituições
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

   # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    id=instituicoes-button    2s
    Click Element                    id=instituicoes-button

    Wait Until Element Is Visible    id=add-institution-button    2s
    Click Element                    id=add-institution-button

   # Preencher formulário
     Wait Until Element Is Visible    id=name    5s
     Input Text                       id=name    Instituição Cadastrado
     Input Text                       id=description    Instituição Cadastrado
     Click Button    xpath=//button[.//span[contains(text(), "Salvar Instituição")]]

    Close Browser

Editar Instituições
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

   # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    id=instituicoes-button    2s
    Click Element                    id=instituicoes-button

    Wait Until Element Is Visible   xpath=//button[@data-testid="editar-institution-1"]    2s
    Click Element    xpath=//button[@data-testid="editar-institution-1"]

    # Preencher formulário
    Wait Until Element Is Visible    id=name    5s
    Input Text                       id=name    Serviço Editado via Teste
    Input Text                       id=description    Instituição Editado via Teste
    Click Button    xpath=//button[.//span[contains(text(), "Salvar Instituição")]]

    Close Browser