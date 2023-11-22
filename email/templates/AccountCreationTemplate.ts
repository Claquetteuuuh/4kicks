import { Template } from "@aws-sdk/client-ses";

export const accountCreationTemplate: Template = {
    TemplateName: "Account_creation",
    HtmlPart: `
        <h1>Hello {{name}} ! </h1>
        <p>Nous avons vu que vous souhaitez créer un compte chez nous !</p>
        <p>Si vous êtes à l'origine de cette tentative, cliquez sur le lien suivant !</p>
        
        <a href="{{url}}">Valider mon compte</a>
        <p>{{url}}</p>
    `,
    SubjectPart: "Création de compte 4kicks",
}