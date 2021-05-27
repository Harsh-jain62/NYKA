import React from 'react';
import {
    FaTag,
    FaHeart,
    FaYoutube,
    FaTwitter,
    FaPinterest,
    FaPaintBrush,
    FaShippingFast,
    FaFacebookSquare,
    FaInstagramSquare,
} from 'react-icons/fa';
import './style.css';

/**
* @author
* @function Footer
**/

const Footer = (props) => {
    return (
        <div className='footerContainer'>
            <div className='quickLinkFooter'>
                <div className='quickLinks'>
                    <span style={{ paddingBottom: 8 }}><img src='/footerLogo.svg' width='80' /></span>
                    <a href='#'>Who are we?</a>
                    <a href='#'>Careers</a>
                    <a href='#'>Authenticity</a>
                    <a href='#'>Press</a>
                    <a href='#'>Testimonials</a>
                    <a href='#'>Nykaa Csr</a>
                    <a href='#'>Responsible disclosure</a>
                </div>
                <div className='quickLinks'>
                    <span>Help</span>
                    <a href='#'>Contact us</a>
                    <a href='#'>Faq</a>
                    <a href='#'>Store locator</a>
                    <a href='#'>Cancellation &amp; return</a>
                    <a href='#'>Shipping &amp; Delivery</a>
                </div>
                <div className='quickLinks'>
                    <span>Inspire Me</span>
                    <a href='#'>Beauty book</a>
                    <a href='#'>Nykaa tv</a>
                    <a href='#'>Nykaa network</a>
                    <a href='#'>Routine Finder</a>
                    <a href='#'>Buying Guides</a>
                </div>
                <div className='quickLinks'>
                    <span>Quick Links</span>
                    <a href='#'>Offer zone</a>
                    <a href='#'>New launches</a>
                    <a href='#'>Nykaa fashion</a>
                    <a href='#'>Nykaa pro</a>
                    <a href='#'>Nykaa Femina beauty</a>
                    <a href='#'>Awards winner 2020</a>
                    <a href='#'>Sitemap</a>
                </div>
                <div className='quickLinks'>
                    <span>Top Categories</span>
                    <a href='#'>Makeup</a>
                    <a href='#'>Skin</a>
                    <a href='#'>Hair</a>
                    <a href='#'>Personal Care</a>
                    <a href='#'>Appliances</a>
                </div>
            </div>
            <div className='socialFooter'>
                <div className='socialContent'>
                    <div className='icon'>
                        <FaTag />
                    </div>
                    <div>
                        <h3>1500+ Brands</h3>
                        <hr />
                        <p>Well Curated 3Lakh + Products</p>
                    </div>
                </div>
                <div className='socialContent'>
                    <div className='icon'>
                        <FaShippingFast />
                    </div>
                    <div>
                        <h3>Free Shipping</h3>
                        <hr />
                        <p>For orders above INR 500</p>
                    </div>
                </div>
                <div className='socialContent'>
                    <div className='icon'>
                        <FaPaintBrush />
                    </div>
                    <div>
                        <h3>Genuine products</h3>
                        <hr />
                        <p>Sourced directly from brands</p>
                    </div>
                </div>
                <div className='block'>
                    <h4>Show us some love <FaHeart style={{
                        color: '#fc2779',
                        marginTop: 2
                    }} /> on social media</h4>
                    <div className='socialLinks'>
                        <a href='#'><FaInstagramSquare /></a>
                        <a href='#'><FaFacebookSquare /></a>
                        <a href='#'><FaYoutube /></a>
                        <a href='#'><FaTwitter /></a>
                        <a href='#'><FaPinterest /></a>
                    </div>
                </div>
            </div>
            <div className='policyFooter'>
                <div className='policy'>
                    <a href='#'>Terms &amp; Conditions</a>
                    <a href='#'>Shipping Policy</a>
                    <a href='#'>Cancellation Policy</a>
                    <a href='#'>Privacy Policy</a>
                </div>
                <p>&copy; 2021 Nykaa E-Retail Pvt. Ltd. All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer;