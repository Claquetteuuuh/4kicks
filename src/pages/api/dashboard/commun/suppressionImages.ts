
import prisma from "@/lib/prisma";
import ImageType from "../../../../../types/dashboard/ImageType"
import {deleteFile} from "@/lib/bucket"

function suppressionImages(images: ImageType[]) {
    const bucketName = process.env.BUCKET_NAME;

    if(bucketName){
        images.forEach( async thisImage=>{
            const suppression = await prisma.image.delete({
                where:{
                    image_uid: thisImage.image_uid
                }
            });
            if(!suppression){
                return false;
            }
            deleteFile(bucketName, thisImage.name);
        })
        return true;
    }
    else{
        return false;
    }
    
}

export default suppressionImages;
