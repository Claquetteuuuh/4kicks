import sesClient from "../../email/sesClient";
import { SendTemplatedEmailCommand } from "@aws-sdk/client-ses"
import { accountCreationTemplate } from "../../email/templates/AccountCreationTemplate";
import { successOrderTemplate } from "../../email/templates/SuccessOrderTemplate";

export const sendAccountCreation = async (email: string, name: string, url: string) => {
    if(!process.env.AWS_SES_SENDER){
        return;
    }
    const sendTemplatedEmailCommand = new SendTemplatedEmailCommand({
        Destination: {
            ToAddresses: [
                email
            ]
        },
        Source: process.env.AWS_SES_SENDER,
        Template: accountCreationTemplate.TemplateName,
        TemplateData: JSON.stringify({
            name: name,
            url: url
        })
    })

    try{
        const sended = await sesClient.send(sendTemplatedEmailCommand) 
        if(sended){
            return true;
        }else{
            return false;
        }
    }catch(err) {
        console.error(err);
        return false;
    }
        
}

export const sendCommandSuccess = async (email: string, name: string, url: string) => {
    if(!process.env.AWS_SES_SENDER){
        return;
    }
    const sendTemplatedEmailCommand = new SendTemplatedEmailCommand({
        Destination: {
            ToAddresses: [
                email
            ]
        },
        Source: process.env.AWS_SES_SENDER,
        Template: successOrderTemplate.TemplateName,
        TemplateData: JSON.stringify({
            name: name,
            url: url
        })
    })

    try{
        const sended = await sesClient.send(sendTemplatedEmailCommand) 
        if(sended){
            console.log("SENDED SUCCESSFULLY")
            return true;
        }else{
            console.log(" PAS SENDED DUTOUT")
            return false;
        }
    }catch(err) {
        console.error(err);
        return false;
    }
        
}