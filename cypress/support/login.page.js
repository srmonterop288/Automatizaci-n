const tiempo = 50000;

class LoginPage {
  // Selectores de elementos clave en la pantalla de inicio de sesión
  elements = {
    usernameInput: "#input_nombre_usuario_login",
    passwordInput: "#input_contrasena_login",
    loginButton: "#btn_ingresar_login",
    dashboardElement: "#div_nombre_usuario",
  };
  /**
   * Realiza el proceso completo de inicio de sesión:
   * visita el sistema, ingresa credenciales, selecciona unidad y área, y valida el acceso.
   */
  performCompleteLogin({
    baseUrl,
    username,
    password,
    unidadEjecutora,
    unidadArea,
  }) {
    if (!baseUrl || !username || !password) {
      throw new Error(
        "Se requiere baseUrl, username y password para iniciar sesión."
      );
    }

    this.visit(baseUrl)
      .typeCredentials(username, password)
      .submitLogin()
      .selectUnit(unidadEjecutora)
      .selectArea(unidadArea)
      ._validateLoginSuccess();
    return this;
  }

  // Abre la URL del sistema y espera que el campo de usuario sea visible
  visit(baseUrl) {
    cy.visit(baseUrl);
    cy.get(this.elements.usernameInput, { timeout: tiempo }).should(
      "be.visible"
    );
    return this;
  }

  // Ingresa el nombre de usuario y la contraseña en los campos correspondientes
  typeCredentials(username, password) {
    cy.get(this.elements.usernameInput).clear().type(username);
    cy.get(this.elements.passwordInput).clear().type(password);
    return this;
  }

  /**
   * Hace clic en el botón "Ingresar" y espera a que desaparezca el loader si aparece.
   * Este método incluye una validación robusta para continuar el flujo sin fallos visuales.
   */
  submitLogin() {
    cy.get(this.elements.loginButton, { timeout: tiempo })
      .should("be.visible")
      .click();

    cy.get("body", { timeout: tiempo }).then(($body) => {
      if (
        $body.find(".ant-btn-icon.ant-btn-loading-icon", { timeout: tiempo })
          .length > 0
      ) {
        cy.get(".ant-btn-icon.ant-btn-loading-icon", {
          timeout: tiempo,
        }).should("not.exist");
      } else {
        cy.log("Loader no apareció, continuando");
      }
    });

    return this;
  }

  // Selecciona la unidad ejecutora usando el selector recibido como parámetro
  selectUnit(selector) {
    cy.get(selector, { timeout: tiempo }).should("be.visible").click();
    return this;
  }

  // Selecciona el área usando el selector recibido como parámetro
  selectArea(selector) {
    cy.get(selector, { timeout: tiempo }).should("be.visible").click();
    return this;
  }

  // Verifica que el usuario ha accedido correctamente al sistema validando la URL y el dashboard
  _validateLoginSuccess() {
    cy.url().should("include", "/dashboard");
    cy.get(this.elements.dashboardElement, { timeout: tiempo }).should(
      "be.visible"
    );
  }

  /**
   * Cambia el rol del usuario actual a otro especificado.
   * Permite indicar si se debe hacer clic en “Cambiar cuenta” antes de seleccionar el nuevo rol.
   */
  changeRol(rolSelector, cambiarCuenta = true) {
    cy.get("#div_nombre_usuario", { timeout: tiempo })
      .should("be.visible")
      .should("exist")
      .click();

    if (cambiarCuenta) {
      cy.get("#spn_menu_cambiar_cuenta", { timeout: tiempo })
        .should("be.visible")
        .should("exist")
        .click();
    }

    cy.get(rolSelector, { timeout: tiempo })
      .should("be.visible")
      .should("exist")
      .click();
    return this;
  }

  /**
   * Navega dentro del sistema seleccionando un módulo y, opcionalmente, un submódulo.
   * Permite controlar si se debe abrir el menú desplegable y/o el módulo principal.
   */
  navigate({
    modulo = null,
    submodulo = null,
    abrirMenuDesplegable = true,
    abrirModulo = true,
  }) {
    if (abrirMenuDesplegable) {
      cy.get("#btn_menu_desplegable", { timeout: tiempo })
        .should("be.visible")
        .should("exist")
        .click();
    }
    if (abrirModulo) {
      cy.get(modulo, { timeout: tiempo })
        .should("be.visible")
        .should("exist")
        .click();
    }

    if (submodulo) {
      cy.get(submodulo, { timeout: tiempo }).should("exist").click();
    }
    return this;
  }
}

export default new LoginPage();
