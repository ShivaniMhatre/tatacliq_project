import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../Navbar/Navbar.css';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
    const { state, Login, Logout } = useContext(AuthContext)
    const [signup_dd, setSignup_dd] = useState(false);
    const [registerPage, setRegisterPage] = useState(false);
    const [loginPage, setLoginPage] = useState(false);
    const [cate_dd, setCate_dd] = useState(false);
    const [color, setColor] = useState(false);
    const [rotate, setRotate] = useState(false);
    const [backGround, setBackGround] = useState(false);

    const [regData, setRegData] = useState({ name: '', email: '', password: '', confirmPassword: '', number: '', role: 'Buyer' })
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const route = useNavigate();

    // Registration
    function registerPage_falldown() {
        setRegisterPage(true)
    }
    function registerPage_fallup() {
        setRegisterPage(false);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegData({ ...regData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (regData.name && regData.email && regData.number && regData.password && regData.confirmPassword && regData.role) {
            if (regData.password == regData.confirmPassword) {
                try {
                    const response = await axios.post('http://localhost:5006/register', { regData })
                    if (response.data.success) {
                        console.log(response.data)
                        setRegData({ name: '', email: '', password: '', confirmPassword: '', number: '', role: 'Buyer' })
                        setLoginPage(true)
                        toast.success(response.data.message)
                    } else {
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                toast.error("Password didn't match")
            }
        } else {
            toast.error("Please Fill All The Details")
        }
    }


    // Login
    function loginPage_falldown() {
        setLoginPage(true)
    }
    function loginPage_fallup() {
        setLoginPage(false);
    }

    const loginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    }
    const loginSubmit = async (e) => {
        e.preventDefault();
        if (loginData.email && loginData.password) {
            const response = await axios.post('http://localhost:5006/login', { loginData })
            if (response.data.success) {
                const token = response.data.token;
                const userData = response.data.userData;
                await Login(userData, token)
                setLoginData({ email: '', password: '' })
                setLoginPage(false)
                route('/')
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } else {
            toast.error("All Fields are mandatory")
        }
    }
    function signup_dd_falldown() {
        setSignup_dd(true)
    }
    function signup_dd_fallup() {
        setSignup_dd(false)
    }

    const logout = () => {
        Logout()
        route('/')
    }

    // Category_dropdown

    function cate_ddfalldown() {
        setCate_dd(true)
        setColor(true)
        setBackGround(true)
        setRotate(true)
    }
    function cate_ddfallup() {
        setCate_dd(false)
        setColor(false)
        setBackGround(false)
        setRotate(false)
    }
    return (
        <div id='navbar'>
            <div id='inner_navbar'>
                <div id='logo'>
                    <img src="http://www.pngimagesfree.com/LOGO/T/Tata-CLiQ/Tata-cliq-logo-PNG-Black-and-White.png" />
                </div>
                <div id='right'>
                    <div id='right_top'>
                        <p>Tata CliQ</p>
                        <span>
                            {state?.user?.role == 'Seller' && <p>Add Product</p>}
                            <p>CLiQ Cash</p>
                            <p>Gift Card</p>
                            <p>CLiQ Care</p>
                            <p>Track Orders</p>
                            <p onMouseEnter={signup_dd_falldown} onMouseLeave={signup_dd_fallup}>SignIn/SignUp</p>
                            <p></p>
                        </span>
                    </div>
                    <div id='right_down'>
                        <div id='right_down_first'>
                            <div className="cate_brand" onMouseEnter={cate_ddfalldown} onMouseLeave={cate_ddfallup}>
                                <p>Categories</p>
                                <i className="fa-solid fa-angle-down" style={{ transform: rotate ? "rotate(180deg)" : "rotate(0deg)" }}></i>
                                {/*  */}
                            </div>
                            <div className="cate_brand">
                                <p>Brand</p>
                                <i className="fa-solid fa-angle-down"></i>
                                {/* style={{ transform: rotate ? "rotate(180deg)" : "rotate(0deg)" }} */}
                            </div>
                        </div>
                        <div id='search'>
                            <div >
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input placeholder='Search for Products' />
                            </div>
                        </div>
                        <div id='down_third'>
                            <div className='tata_cart'>
                                <img src='https://www.tatacliq.com/src/general/components/img/WL4.svg' />
                            </div>
                            <div className='tata_cart'>
                                <img src='https://www.tatacliq.com/src/general/components/img/orderhistorywhite.svg' />
                            </div>
                            {/* {userData?.name && <div className='tata_cart'>
                                <img src='https://www.tatacliq.com/src/general/components/img/orderhistorywhite.svg' />
                            </div>} */}
                        </div>
                    </div>
                </div>
            </div>

            {/* SignupDropDown */}
            {signup_dd &&
                <div id='signup_dd' onMouseEnter={signup_dd_falldown} onMouseLeave={signup_dd_fallup}>
                    <div id='login_btn' onClick={registerPage_falldown}>
                        <p>Login / SignUp</p>
                    </div>
                    <div className='list'>
                        <div>
                            <img src='https://www.tatacliq.com/src/general/components/img/profile.png' />
                        </div>
                        <div>
                            <p>My Account</p>
                        </div>
                    </div>
                    <div className='list'>
                        <div>
                            <img src='https://www.tatacliq.com/src/general/components/img/order-history.svg' />
                        </div>
                        <div>
                            <p>Order History</p>
                        </div>
                    </div>
                    <div className='list'>
                        <div>
                            <img src='https://www.tatacliq.com/src/general/components/img/WL7.svg' />
                        </div>
                        <div>
                            <p>My Wishlist</p>
                        </div>
                    </div>
                    <div className='list'>
                        <div>
                            <img src='https://www.tatacliq.com/src/account/components/img/alert.svg' />
                        </div>
                        <div>
                            <p>Alert & Coupon</p>
                        </div>
                    </div>
                    <div className='list'>
                        <div>
                            <img src='https://www.tatacliq.com/src/account/components/img/giftCards.svg' />
                        </div>
                        <div>
                            <p>Gift Card</p>
                        </div>
                    </div>
                    <div className='list'>
                        <div>
                            <img src='https://www.tatacliq.com/src/account/components/img/cliqCash.svg' />
                        </div>
                        <div>
                            <p>CLiQ Cash</p>
                        </div>
                    </div>
                    {/* {state?.user?.name && */}
                        <div className="list">
                            <div>
                                <img src='https://www.tatacliq.com/src/general/components/img/settingsblack.svg' />
                            </div>
                            <div onClick={logout()}>
                                <span>Logout</span>
                            </div>
                        </div>
                    {/* } */}
                </div>
            }

            {/* Register Page */}
            {registerPage &&
                <div id='register_page'>
                    <div id='register_form'>
                        <div id='register_top'>
                            <i onClick={registerPage_fallup}>X</i>
                        </div>
                        <div id='register_middle'>
                            <p>Welcome To Tata</p>
                            <p>CLiQ</p>
                            <p>Please Enter Your Detail</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='register_field'>
                                <label>Name</label><br />
                                <input type='text' name='name' onChange={handleChange} />
                            </div>
                            <div className='register_field'>
                                <label>Email</label><br />
                                <input type='email' name='email' onChange={handleChange} />
                            </div>
                            <div className='register_field'>
                                <label>Mobile Number</label><br />
                                <input type='number' name='number' placeholder='+91' onChange={handleChange} />
                            </div>
                            <div className='register_field'>
                                <label>Password</label><br />
                                <input type='password' name='password' onChange={handleChange} />
                            </div>
                            <div className='register_field'>
                                <label>Confirm Password</label><br />
                                <input type='password' name='confirmPassword' onChange={handleChange} />
                            </div>
                            <div className='register_field'>
                                <label>Role</label><br />
                                <select name='role' onChange={handleChange}>
                                    <option value='Buyer'>Buyer</option>
                                    <option value='Seller'>Seller</option>
                                    <option value='Admin'>Admin</option>
                                </select>
                            </div>
                            <div id='tandp'>
                                <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Services apply. </p>
                                <p>By continuing, you agree to our Terms of Use and Privacy Policy.</p>
                            </div>
                            <div id='register_btn'>
                                <input type='submit' value='Register' />
                            </div>
                            <p onClick={loginPage_falldown} onMouseLeave={registerPage_fallup}>Alredy Have An Account?</p>
                        </form>
                    </div>

                </div >
            }
            {/* Login Page */}
            {loginPage &&
                <div id='register_page'>
                    <div id='register_form'>
                        <div id='register_top'>
                            <i onClick={registerPage_fallup}>X</i>
                        </div>
                        <div id='register_middle'>
                            <p>Welcome To Tata</p>
                            <p>CLiQ</p>
                            <p>Please Enter Your Detail</p>
                        </div>
                        <form onSubmit={loginSubmit}>
                            <div className='register_field'>
                                <label>Email</label><br />
                                <input type='text' name='email' onChange={loginChange} />
                            </div>
                            <div className='register_field'>
                                <label>Password</label><br />
                                <input type='password' name='password' onChange={loginChange} />
                            </div>
                            <div id='register_btn' onClick={loginPage_falldown} onMouseLeave={registerPage_fallup}>
                                <input type='submit' value='Login' />
                            </div>
                        </form>
                    </div>
                </div>
            }
            {/* Category Dropdown */}
            {/* {cate_dd &&
                <div id='cate_dd' onMouseEnter={cate_ddfalldown} onMouseLeave={cate_ddfallup} style={{ backgroundColor: backGround ? "white" : "black", color: color ? "black" : "white" }}>
                    All Category
                </div>} */}
        </div>
    )
}

export default Navbar