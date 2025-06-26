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
    Wait Until Element Is Visible    id=servicos-button    2s
    Click Element                    id=servicos-button

    Close Browser

Cadastrar Serviço
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

   # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    id=servicos-button    2s
    Click Element                    id=servicos-button

    Wait Until Element Is Visible    id=add-service-button    2s
    Click Element                    id=add-service-button

   # Preencher formulário
    Wait Until Element Is Visible    id=instituicao    5s
    Select From List By Index        id=instituicao    1
    ${random_name}=    Generate Random String    5
    Input Text    id=name           Serviço Teste ${random_name}
    Input Text    id=description    Serviço automatizado de testes com Robot Framework
    Click Button    xpath=//button[.//span[contains(text(), "Salvar Serviço")]]

    Close Browser

Editar Serviço
    Open Browser    ${URL}    ${BROWSER}

    # Login
    Input Text    id=email       ${EMAIL}
    Input Text    id=password    ${SENHA}
    Click Element    id=login-button

   # Verificar se o login foi bem-sucedido
    Wait Until Element Is Visible    id=servicos-button    2s
    Click Element                    id=servicos-button

    Wait Until Element Is Visible   xpath=//button[@data-testid="editar-servico-1"]    2s
    Click Element    xpath=//button[@data-testid="editar-servico-1"]

    # Preencher formulário
        Wait Until Element Is Visible    id=instituicao    5s
        Select From List By Index        id=instituicao    1
        ${random_name}=    Generate Random String    5
        Input Text    id=name           Serviço Edição Teste ${random_name}
        Input Text    id=description    Serviço Edição  de testes com Robot Framework
        Click Button    xpath=//button[.//span[contains(text(), "Salvar Serviço")]]

    Close Browser