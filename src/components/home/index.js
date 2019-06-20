import React from 'react';
import Featured from './featured/index';
import Matches from './matches/index';
import MeetPlayers from './meetPlayers/index';
import Promotion from './promotion/index';

const Home = () => {
    return (
        <div className='bck_blue'>
            <Featured/>
            <Matches/>
            <MeetPlayers/>
            <Promotion/>
        </div>
    );
};

export default Home;