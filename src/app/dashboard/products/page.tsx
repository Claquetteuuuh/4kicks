import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import React from 'react';
import { userType } from '../../../../types/global/UserType';

const Page = ({params}: {params: { user: userType }}) => {
    return (
        <DashboardLayout params={params}>
            Products
        </DashboardLayout>
    );
};

export default Page;