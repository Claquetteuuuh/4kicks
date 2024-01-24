"use client"
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import React from 'react';
import { userType } from '../../../types/global/UserType';

const Dashboard = ({params}: {params: { user: userType }}) => {
    return (
        <DashboardLayout params={params} children={undefined} >
            
        </DashboardLayout>
    );
};

export default Dashboard;