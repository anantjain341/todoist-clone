import React from 'react';
import {FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa';

function Sidebar({selectedTab, setSelectedTab}){
    return <div className='sidebar'>
        <div className={selectedTab === 'INBOX' ? 'active' : null} onClick={()=>{setSelectedTab('INBOX')}} ><FaInbox className='icon'/> Inbox</div>
        <div className={selectedTab === 'TODAY' ? 'active' : null} onClick={()=>{setSelectedTab('TODAY')}}><FaRegCalendarAlt className='icon'/> Today</div>
        <div className={selectedTab === 'NEXT 7 DAYS' ? 'active' : null} onClick={()=>{setSelectedTab('NEXT 7 DAYS')}}><FaRegCalendar className='icon'/> Next 7 Days</div>
    </div>
}
export default Sidebar;