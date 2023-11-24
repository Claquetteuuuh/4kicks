"use client"
import React, { useEffect } from 'react';
import { userType } from '../../../types/global/UserType';
import { useRouter } from 'next/navigation';

const CheckAccountLayout = ({ user, children }: { children: React.ReactNode, user: userType }) => {

    const router = useRouter();
    
    useEffect(() => {
        console.log(user)
        if(user){
            if(!user.completed){
                router.push("/signup/complete")
            }
        }
    }, [user])

    return (
        <div>
            {children}
        </div>
    );
};

export default CheckAccountLayout;