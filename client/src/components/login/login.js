import React, { useState } from 'react';
import logo from '../../assets/outsource-logo-square.png';
import './login.css'
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';

const Login  = () =>{
  let history = useHistory()
  const [message,setMessage] = useState('')
  const [show,setShow] = useState(false)
  return (
  <Formik
    initialValues={{ ogID: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        axios.post(`/api/login`,  values )
        .then(res => {
          console.log(res);
          console.log(res.data);
          let user = {fullName: res.data.user.fullname, id: res.data.user._id, department: res.data.user.department, ogID: res.data.user.ogID}
          let token = res.data.token
          console.log(token)
          localStorage.setItem("token", token)   
           localStorage.setItem('user', JSON.stringify(user))
          // localStorage.setItem('fullname', res.data.user.fullName)
          // localStorage.setItem('ogID', res.data.user.ogID)         
          history.push('/',{user: res.data.user})       
        })
        .catch(err =>{
          console.log(err.response)
          console.log(err.response)
          setShow(true)
          setMessage(err.response.data.message)
        })	
        setSubmitting(false);
      }, 500);
    }}
    validationSchema={Yup.object().shape({
      ogID: Yup.string() 
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
          <div className="main-wrapper mt-2">
    <div className="account-content mt-4">
    
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
            <h3 className="account-title">Login</h3>
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
                <button className="btn btn-primary account-btn" disabled={isSubmitting} type="submit">Login</button>
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

export default Login