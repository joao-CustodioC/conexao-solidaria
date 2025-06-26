*** Settings ***
Library     SeleniumLibrary
Library    String

*** Variables ***
${URL}        http://localhost:3000
${BROWSER}    chrome
${EMAIL}      joao@gmail.com
${SENHA}      Dev@123#

*** Test Cases ***
Cadastrar Usuário Administrador
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

   # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    id=usuarios-button    2s
    Click Element                    id=usuarios-button

    Wait Until Element Is Visible    id=add-user-button    2s
    Click Element                    id=add-user-button

    # Preencher formulário
    Wait Until Element Is Visible    id=name    5s
    Input Text    id=name        Admin Teste
     ${random}=    Generate Random String    5
    Input Text    id=email       adminteste${random}@teste.com
    Input Text    id=password    Senha@1234

    Click Button    xpath=//button[.//text()[contains(., "Salvar Usuário") or contains(., "Atualizar")]]

    Close Browser