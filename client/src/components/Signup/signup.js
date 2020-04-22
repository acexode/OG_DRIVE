import React, { Component,useState,useContext } from 'react';
import logo from '../../assets/outsource-logo-square.png';
import './signup.css'
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';

const Signup  = () =>{
  let history = useHistory()
  const [message,setMessage] = useState('')
  const [show,setShow] = useState(false)
  return (
  <Formik
    initialValues={{ ogID: "", password: "", department:"", fullname: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        axios.post(``,  values )
        .then(res => {
          console.log(res);
          console.log(res.data);                  
          history.push('/login')       
        })
        .catch(err =>{
          console.log(err.response.data.msg)
          setShow(true)
          setMessage(err.response.data.msg)
        })	
        setSubmitting(false);
      }, 500);
    }}
    validationSchema={Yup.object().shape({
      ogID: Yup.string() 
        .required("Required"),
      fullname: Yup.string() 
        .required("Required"),
      department: Yup.string() 
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")        
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
      <div className="account-page">
          <div className="main-wrapper">
    <div className="account-content">
    
      <div className="container">			
      
        <div className="account-logo">
          <a href="index.html"><img src={logo} alt="Outsource Global Technologies" /></a>
        </div>
      { show ? ( 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
         {message}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>): (<div></div>)
    }
        
        <div className="account-box">
          <div className="account-wrapper">
            <h3 className="account-title">Signup</h3>
            <p className="account-subtitle">Access to our dashboard</p>
            
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>OGID </label>
                <input 
                name="ogID"
                type="text"
                placeholder="Enter your OGID"
                value={values.ogID}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.ogID && touched.ogID && "error"}
                className="form-control" type="text" />
                {errors.ogID && touched.ogID && (
                  <div className="input-feedback">{errors.ogID}</div>
                )}
              </div>
              <div className="form-group">
                <label>Fullname </label>
                <input 
                name="fullname"
                type="text"
                placeholder="Enter your fullname"
                value={values.fullname}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.fullname && touched.fullname && "error"}
                className="form-control" type="text" />
                {errors.fullname && touched.fullname && (
                  <div className="input-feedback">{errors.fullname}</div>
                )}
              </div>
              <div className="form-group">
                <label>Department </label>
                <input 
                name="department"
                type="text"
                placeholder="Enter your Department"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.department && touched.department && "error"}
                className="form-control" type="text" />
                {errors.department && touched.department && (
                  <div className="input-feedback">{errors.department}</div>
                )}
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label>Password</label>
                  </div>
                  <div className="col-auto">
                    <a className="text-muted" href="#">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password && touched.password && "error"}
                className="form-control" type="password" />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group text-center">
                <button className="btn btn-primary account-btn" disabled={isSubmitting} type="submit">Signup</button>
              </div>								
            </form>
          
            
          </div>
        </div>
      </div>
    </div>
      </div>
      </div>
  )
      }}
      </Formik>
      )
}

export default Signup