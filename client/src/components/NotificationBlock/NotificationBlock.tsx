import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const NotificationBlock = () => {
    return (
        <div className=''>
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default NotificationBlock