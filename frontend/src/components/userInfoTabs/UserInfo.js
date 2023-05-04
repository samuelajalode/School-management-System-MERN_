import React from 'react'
import {Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {getCapitalize, getIntial, getImgSrc} from '../../utils'
import {useSelector} from 'react-redux';
import {selectUser} from '../../store/slices/userSlice'



function StudentInfo({id, name, surname, middleName, role , route, photoUrl}) {
    const user = useSelector(selectUser)
    return (
        <div className="content__container student__info">
            <Avatar className="avatar" src={getImgSrc(photoUrl)} alt={getCapitalize(name || "")}/>
            <h5>{getCapitalize(name || "")} {middleName && getIntial(middleName)}  {getCapitalize(surname || "")}</h5>
             <h6>{id}</h6>
            <div className="text-muted">{role}</div>
            {user?.role === "admin" && 
                 <Link 
                   to={`/${route}/edit/${id}`} 
                   className="btn blue__btn sm__btn mt-4">
                     Edit
                </Link>
            }
            
        </div>
    )
}

export default StudentInfo
