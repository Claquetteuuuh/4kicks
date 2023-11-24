import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getSession(){
    return await getServerSession(authOptions)
}

export async function getCurrentUser(){
    try{
        const session = await getSession();

        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma?.account.findUnique({
            where:{
                email: session.user.email,
            },
            select: {
                first_name: true,
                last_name: true,
                username: true,
                email: true,
                completed: true,
                creation_date: true,
                profile_image: {select: {name: true}},
                connection_type: true
            }
        })
        if(!currentUser){
            return null
        }
        return {
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            username: currentUser.username,
            email: currentUser.email,
            completed: currentUser.completed,
            creation_date: currentUser.creation_date,
            image: currentUser.profile_image?.name?`${process.env.PUBLIC_DOMAINE_BUCKET_URL}${currentUser.profile_image?.name}`:undefined,
            connection_type: currentUser.connection_type,
        }
    }catch(err){
        return null;
    }
}