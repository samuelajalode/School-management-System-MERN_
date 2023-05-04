import React from 'react';
import GuadianCard from '../../AdminComponents/shared/GuadianCard'

function GuadanceTab({user}) {
    console.log(user, "guadance tab")
    return (
        <div>
            {user?.length > 0 ? user.map(e => {
                return(
                    <GuadianCard  guadian={e}  key={e._id} noEdit={true}/>
                )
            }) : <div>No guadian info</div>}
        </div>
    )
}

export default GuadanceTab
