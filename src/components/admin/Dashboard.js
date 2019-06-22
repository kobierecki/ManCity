import React from 'react';
import AdminLayout from '../../HoC/Admin_layout';

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className='user_dashboard'>
                <div>
                    This is your dashboard.
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;