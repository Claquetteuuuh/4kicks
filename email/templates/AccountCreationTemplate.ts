import { Template } from "@aws-sdk/client-ses";

export const accountCreationTemplate: Template = {
  TemplateName: "Account_creation",
  HtmlPart: `
  <style>
  .container {
    --color: #33a9ff;
    width: 100%;
    border-top: 3px solid var(--color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .container svg {
    height: 90px;
  }

  .container * {
    padding: 0;
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
  .container h1 {
    margin: 20px 0;
    color: var(--color);
  }
  .activate {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .activate p {
    opacity: 0.6;
    margin: 2px 0;
  }

  .container a.button {
    background-color: var(--color);
    width: 30%;
    max-width: 200px;
    min-width: 150px;
    padding: 1% 3%;
    text-align: center;
    color: white;
    text-decoration: none;
    font-weight: 600;
    border-radius: 5px;
    transition: all 0.3s;
    margin: 30px 0;
  }

  .container a.button:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }

  .link {
    margin: 10px 0;
  }
  .link p {
    font-size: 0.8rem;
    opacity: 0.7;
  }
  .link a {
    font-size: 0.8rem;
    opacity: 0.8;
    color: var(--color);
    text-decoration: underline;
  }
</style>
<div class="container">
  <img src="https://4kicks.store/imgs/logo.png" alt="Logo 4kicks" />

  <div class="activate">
    <h1>Activate your account !</h1>
    <p>
      {{name}}, on a juste besoin de valider votre adresse email pour activer
      votre compte 4kicks
    </p>
    <p>
      Si vous êtes à l'origine de cette tentative, cliquez sur le bouton
      suivant !
    </p>
  </div>

  <a class="button" href="{{url}}">Valider mon compte</a>

  <div class="link">
    <p>
      Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur:
    </p>
    <a href="{{url}}">{{url}}</a>
  </div>
</div>
    `,
  SubjectPart: "Création de compte 4kicks",
};
