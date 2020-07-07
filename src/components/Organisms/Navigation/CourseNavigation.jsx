import React from 'react'
import { NavLink } from 'react-router-dom'

const CourseNavigation = ({id, options, is_student, term_name}) => {

    console.log('is_student', is_student)
    // console.log(options)
    return (
        <div>
            <nav id="sidebar">
                <ul className="list-unstyled components alist-course-rubik">
                    
                    <div className="text-center py-1">
                        <span style={{fontSize: '.8em'}}>{term_name}</span>
                    </div>                

                    {options.map(function( o, index) {
                        return (is_student && !o.visibility) ? null 
                                : <li key={index} className="">
                                    <NavLink to={'/courses/'+ id + '/' + o.display_url} exact>
                                        {o.display_name} 
                                        { o.visibility ? null : <i className="fa fa-eye-slash pull-right" aria-hidden="true"></i> }
                                        
                                    </NavLink>
                                </li>
                    })}

                </ul>
            </nav>
        </div>
        
    )
}

export default CourseNavigation
