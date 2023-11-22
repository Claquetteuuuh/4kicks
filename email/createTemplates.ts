import { CreateTemplateCommand, SESClientConfig, SESClient, DeleteTemplateCommand } from "@aws-sdk/client-ses";
import { accountCreationTemplate } from "./templates/AccountCreationTemplate";
import sesClient from "./sesClient";

export const createAllTemplates = () => {
    const deleteTemplateCommand = new DeleteTemplateCommand({TemplateName: accountCreationTemplate.TemplateName})
    sesClient.send(deleteTemplateCommand)

    const createTemplateCommand = new CreateTemplateCommand({
        Template: accountCreationTemplate        
    });
    sesClient.send(createTemplateCommand)
    .then(e => {
        console.log(`${accountCreationTemplate.TemplateName} created successfully`)
    })
    .catch(err => {
        console.error(`An error occured while creating ${accountCreationTemplate.TemplateName}: \n ${err}` )
    })
    
}