import React from 'react';
import { userType } from '../../../../types/global/UserType';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';

const Page = ({params}: {params: { user: userType }}) => {
    return (
        <DashboardLayout params={params}>
            accounts
        </DashboardLayout>
    );
};

export default Page;