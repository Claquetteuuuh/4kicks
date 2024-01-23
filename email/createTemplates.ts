import { CreateTemplateCommand, SESClientConfig, SESClient, DeleteTemplateCommand } from "@aws-sdk/client-ses";
import { accountCreationTemplate } from "./templates/AccountCreationTemplate";
import { successOrderTemplate } from "./templates/SuccessOrderTemplate";
import { accountActivationTemplate } from "./templates/AccountActivationTemplate";
import sesClient from "./sesClient";

export const createAllTemplates = async () => {
    const deleteAccountCreation = new DeleteTemplateCommand({TemplateName: accountCreationTemplate.TemplateName})
    const deleteAccountActivation = new DeleteTemplateCommand({TemplateName: accountActivationTemplate.TemplateName})
    const deleteSuccessOrder = new DeleteTemplateCommand({TemplateName: successOrderTemplate.TemplateName})
    await sesClient.send(deleteAccountCreation)
    await sesClient.send(deleteAccountActivation)
    await sesClient.send(deleteSuccessOrder)
    
    const createAccountCreation = new CreateTemplateCommand({
        Template: accountCreationTemplate        
    });
    await sesClient.send(createAccountCreation)
    .then(e => {
        console.log(`${accountCreationTemplate.TemplateName} created successfully`)
    })
    .catch(err => {
        console.error(`An error occured while creating ${accountCreationTemplate.TemplateName}: \n ${err}` )
    })
    
    const createSuccessOrder = new CreateTemplateCommand({
        Template: successOrderTemplate        
    });
    await sesClient.send(createSuccessOrder)
    .then(e => {
        console.log(`${successOrderTemplate.TemplateName} created successfully`)
    })
    .catch(err => {
        console.error(`An error occured while creating ${successOrderTemplate.TemplateName}: \n ${err}` )
    })

    const createAccountActivation = new CreateTemplateCommand({
        Template: accountActivationTemplate        
    });
    await sesClient.send(createAccountActivation)
    .then(e => {
        console.log(`${accountActivationTemplate.TemplateName} created successfully`)
    })
    .catch(err => {
        console.error(`An error occured while creating ${accountActivationTemplate.TemplateName}: \n ${err}` )
    })
    
}