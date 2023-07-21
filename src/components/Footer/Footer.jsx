import './Footer.css'

function Footer() {
    return (
        <div className='footerContainer'>
            <div>
                <ul>
                    <li>Project for: <span className='spanFooter'>Ironhack Barcelona</span></li>
                </ul>

                </div>
                <div>
                <h4>Libraries</h4>
                <li>scss </li>
                <li>bootstrap </li>
                <li>JQuery </li>
            </div>

            <div>
                <h4>Created with AI: </h4>
                <li>model: 'text-davinci-003'</li>
                <li>Your no-code AI Website Builder </li>
            </div>
        </div>
    )
}

export default Footer;